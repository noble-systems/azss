import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import type { InquiryRecord } from "@/lib/types";
import type { Store } from "./types";

/**
 * DynamoDB driver.
 *
 * Table shape (see infra/azss-infra.yaml):
 *   Submissions  PK pk (S)  ·  GSI "byType": PK type (S), SK createdAt (S)
 *
 * The index lets the list be read newest-first without scanning the table.
 */

// Amplify reserves names beginning with AWS_, so APP_AWS_REGION is the one you
// can actually set in the console; AWS_REGION is injected by Lambda at runtime.
const region = process.env.APP_AWS_REGION ?? process.env.AWS_REGION ?? "us-west-1";

let docClient: DynamoDBDocumentClient | null = null;

function client(): DynamoDBDocumentClient {
  if (!docClient) {
    docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region }), {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return docClient;
}

const TABLE = () => process.env.SUBMISSIONS_TABLE as string;

/**
 * Reads every page, not just the first. DynamoDB caps a Query response at 1MB
 * and hands back a LastEvaluatedKey to continue from; ignoring it silently
 * shows a prefix of the table once it outgrows a megabyte.
 */
async function readAll<T>(
  send: (cursor: Record<string, unknown> | undefined) => Promise<{
    Items?: Record<string, unknown>[];
    LastEvaluatedKey?: Record<string, unknown>;
  }>,
): Promise<T[]> {
  const items: Record<string, unknown>[] = [];
  let cursor: Record<string, unknown> | undefined;

  do {
    const page = await send(cursor);
    items.push(...(page.Items ?? []));
    cursor = page.LastEvaluatedKey;
  } while (cursor);

  return items as T[];
}

export const dynamoStore: Store = {
  kind: "dynamodb",

  async putInquiry(record) {
    await client().send(new PutCommand({ TableName: TABLE(), Item: record }));
    return record;
  },

  async listInquiries() {
    return readAll<InquiryRecord>((cursor) =>
      client().send(
        new QueryCommand({
          TableName: TABLE(),
          IndexName: "byType",
          KeyConditionExpression: "#type = :type",
          ExpressionAttributeNames: { "#type": "type" },
          ExpressionAttributeValues: { ":type": "inquiry" },
          ScanIndexForward: false,
          ExclusiveStartKey: cursor,
        }),
      ),
    );
  },
};
