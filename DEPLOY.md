# Deploying Arizona Sound System to AWS

Architecture: **Amplify Hosting** (CloudFront + Lambda for the Next.js server) → **DynamoDB** for inquiries and rate-limit counters → **SES** for email.

Expect roughly **$0–10/month** at launch traffic. DynamoDB is pay-per-request, SES is fractions of a cent per message, and Amplify bills for build minutes and bandwidth.

---

## 1. Create the data stack

One CloudFormation command, no CDK toolchain, no bootstrap.

```bash
aws cloudformation deploy \
  --template-file infra/azss-infra.yaml \
  --stack-name azsoundsystem \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-west-1
```

Read the outputs, you need them in step 3:

```bash
aws cloudformation describe-stacks \
  --stack-name azsoundsystem \
  --region us-west-1 \
  --query 'Stacks[0].Outputs' \
  --output table
```

> The submissions table is created with `DeletionPolicy: Retain`, so deleting the stack will **not** delete your inquiries.

---

## 2. Connect the repo to Amplify Hosting

1. Push this repository to GitHub.
2. AWS console → **Amplify** → **Create new app** → **Deploy from Git**.
3. Pick the repo and branch (`main`).
4. Amplify detects Next.js and reads `amplify.yml` from the repo root. Confirm the platform is **Next.js SSR (WEB_COMPUTE)**, not static.
5. Deploy.

The first build will succeed even before step 3. The page renders fully; only the form will fail with a clear 502 until the table exists and the role can reach it.

---

## 3. Add environment variables

Amplify → your app → **App settings → Environment variables**. Add these, using the CloudFormation outputs from step 1:

| Name                | Output to use          |
| ------------------- | ---------------------- |
| `SUBMISSIONS_TABLE` | `SubmissionsTableName` |
| `RATELIMIT_TABLE`   | `RateLimitTableName`   |
| `APP_AWS_REGION`    | `Region`               |

Email needs a few more, see [Email](#email) below.

> Amplify rejects names beginning with `AWS_`, which is why the region variable is `APP_AWS_REGION`. The app falls back to Lambda's own `AWS_REGION` if it is absent.

> **Setting a variable in the Amplify console is not enough.** Amplify exposes environment variables to the build but does not inject them into the Next.js SSR runtime, so every server-side variable must also be in the `env | grep -E` allow-list in `amplify.yml`. Skipping that produces a site that deploys green, serves every page, and fails every form post.

### Give the app permission to reach DynamoDB

Amplify → **App settings → IAM roles → Compute role**. Create or select a service role, then attach the managed policy from the stack output `AppDataPolicyArn`:

```bash
aws iam attach-role-policy \
  --role-name <your-amplify-compute-role> \
  --policy-arn <AppDataPolicyArn from step 1>
```

**Redeploy** after changing environment variables or the role. Amplify only picks them up on a new build.

---

## Email

Two messages go out on every inquiry: an acknowledgement to the person who asked, and the inquiry itself to the team, with Reply-To set to the sender so replying answers them directly.

Both are optional and both fail safely. **A broken email setup can never lose an inquiry**, because the record is written to DynamoDB before anything is sent, and each send is wrapped individually so one failure can't stop the other.

### 1. Verify a sending domain

Redeploy the stack with the domain:

```bash
aws cloudformation deploy \
  --template-file infra/azss-infra.yaml \
  --stack-name azsoundsystem \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-west-1 \
  --parameter-overrides SendingDomain=azsoundsystem.com
```

Read the DNS records back out and add them at your registrar:

```bash
aws cloudformation describe-stacks --stack-name azsoundsystem \
  --region us-west-1 --query 'Stacks[0].Outputs' --output table
```

- `DkimRecord1/2/3` → three **CNAME** records (proves you own the domain, signs outgoing mail)
- `MailFromMxRecord` → one **MX** record on `mail.` at priority 10
- `MailFromTxtRecord` → one **TXT** record on `mail.` (SPF)

Verification usually completes within an hour of the DNS propagating. Check with:

```bash
aws sesv2 get-email-identity --email-identity azsoundsystem.com --region us-west-1 \
  --query '{Verified:VerifiedForSendingStatus,Dkim:DkimAttributes.Status}'
```

If the domain's mail is hosted elsewhere (Google Workspace, say), the root `@` keeps its own MX and SPF and the `mail.` subdomain records above sit beside them. The "one SPF record per domain" rule is per hostname, so the two do not conflict.

### 2. Leave the SES sandbox

New AWS accounts can only send to addresses you've verified by hand. The team address is on the verified domain, so the internal alert works in the sandbox, but the acknowledgement to a member of the public does not. Request production access once per account, usually approved within 24 hours:

```bash
aws sesv2 put-account-details \
  --production-access-enabled \
  --mail-type TRANSACTIONAL \
  --website-url https://azsoundsystem.com \
  --use-case-description "Acknowledgement emails to people who submit a quote request on our website, plus an internal copy of each request to our team. One message per submission, no marketing." \
  --region us-west-1
```

### 3. Add the environment variables

| Name                     | Value                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| `SES_FROM_ADDRESS`       | `Arizona Sound System <hello@azsoundsystem.com>`, must be on the verified domain |
| `SES_CONFIGURATION_SET`  | The `EmailConfigurationSetName` output                                           |
| `SITE_URL`               | `https://azsoundsystem.com` (used for the logo inside emails)                    |
| `SES_REPLY_TO`           | Optional. Defaults to `contact.email`.                                           |
| `INQUIRY_NOTIFY_ADDRESS` | Optional override of `notifications.inquiry` in `content/site.ts`.               |

Redeploy after adding variables.

---

## 4. Custom domain

Amplify → **Hosting → Custom domains → Add domain**. Amplify provisions the ACM certificate and the CloudFront distribution.

Two things that are easy to get wrong:

- **The apex must be an ALIAS (or your registrar's equivalent), never a CNAME.** DNS forbids a CNAME on a root domain, and adding one anyway makes it take precedence over every other record at `@`, including the MX. The website would look perfect while all email silently stopped.
- `brand.domain` in `content/site.ts` drives canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. It is already `https://azsoundsystem.com`; change it if the domain changes.

---

## Operating notes

**Where the data lives.** Two tables, pay-per-request:

- `azsoundsystem-submissions`, one item per inquiry, keyed `inquiry#<uuid>`, with point-in-time recovery on. The `byType` index reads them newest-first.
- `azsoundsystem-ratelimit`, short-lived counters with TTL. Nothing here is worth keeping.

**Reading the inquiries.** Every one is emailed to the team, so the inbox is the working list. For a full export:

```bash
aws dynamodb query --table-name azsoundsystem-submissions --index-name byType \
  --key-condition-expression "#t = :t" \
  --expression-attribute-names '{"#t":"type"}' \
  --expression-attribute-values '{":t":{"S":"inquiry"}}' \
  --no-scan-index-forward --region us-west-1
```

**Rate limits.** Six form posts per ten minutes per IP. If DynamoDB is unreachable the limiter **allows** the request and logs; a storage blip should not take the form down, and the honeypot and validation still apply.

**Backups.** Point-in-time recovery is enabled on the submissions table (35-day restore window).

**Local development.** With no environment variables set, `npm run dev` writes to `.data/inquiries.json` and sends no email. That path is hard-disabled when `NODE_ENV=production`.
