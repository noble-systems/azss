# Getting found on Google and in AI answers

Written 17 October 2026. The site side is done: every page has its own title and description, structured data, a sitemap, fast loading (Lighthouse SEO 100, performance 91 on a phone), and nothing blocks the AI search crawlers. What's left only you can do, because each one needs your own account or your customers.

ChatGPT, Google's AI answers, Gemini, Perplexity, Copilot and Siri don't read a website and decide on their own. For a local service they lean on business listings and reviews, then on websites, then on other sites that mention the business. Google says outright that a Business Profile helps a service show up in its AI answers. Perplexity and ChatGPT both pull local business details from Yelp. Copilot uses Bing Places. The research and the sources are in docs/market-research-2026-10.md and at the end of this file.

## Do these first

1. **Google Business Profile.** Go to business.google.com and create a profile for Arizona Sound System. Pick "I deliver goods and services to my customers" so it's a service-area business, and hide the address. Add up to 20 service areas: Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria and so on. Google says the area shouldn't be more than about two hours' drive from your base, so leave Flagstaff and Tucson off if they're further than that. Use the exact name "Arizona Sound System", the phone (804) 517-8968, and https://azsoundsystem.com. Add the photos from the site. Google needs a real address to verify you, even though it stays hidden.
2. **Reviews on Google.** Ask everyone you've done an event for. This matters more than anything on the website. Centric Events, the biggest local competitor, showed 159 Google reviews on its own site on 17 October 2026.
3. **Bing Places** at bing.com/forbusiness. It can import the Google profile once that's verified. Copilot uses it, and ChatGPT has leaned on Bing in the past.
4. **Yelp business page** at biz.yelp.com. ChatGPT and Perplexity both take local business details from Yelp.
5. **Google Search Console** at search.google.com/search-console. Add the domain azsoundsystem.com. Namecheap DNS verification is the cleanest, or send me the HTML tag code and I'll put it in the site. Then submit https://azsoundsystem.com/sitemap.xml.
6. **Bing Webmaster Tools** at bing.com/webmasters. You can import the site from Search Console. Its AI Performance report shows how often Copilot cites the site.

## Then these

- **Facebook business page.** Local-SEO vendors say Bing listings pull in reviews from Facebook and Yelp.
- **Get named by the people you work with.** Ask promoters, venues and DJs to tag @arizonasoundsystem and name you as the sound provider in event pages, lineups and recaps. Mentions of a business around the web track closely with showing up in Google's AI answers.
- **Thumbtack and GigSalad.** Thumbtack's Phoenix AV rentals page had one provider with no reviews when I checked. GigSalad has one Scottsdale sound company with an EDM show in its gallery.
- **Apple Business Connect** at businessconnect.apple.com. Siri and Apple Maps use it, but Apple may not show a public place card for a business with no storefront.

## Things that would make the site itself stronger

Send me any of these and I'll add them:

- Names of venues or events the system has played, with photos. Google says it rewards first-hand content, and this is the clearest kind.
- Your name, and the year you started. That's enough for an About section.
- A starting price. No Phoenix company publishes an all-in price for a full system with an engineer.
- Whether to name the gear. Nobody in Arizona says BASSBOSS on their site, and AI answers quote specific facts. In September you said to leave specs off, so they're still off.

## After every deploy

Run `node scripts/indexnow.mjs` once the Amplify build has finished. It tells Bing and the other IndexNow engines to recrawl every page in the sitemap.

## What I skipped and why

- **llms.txt.** Nobody running a major AI assistant has said they read it, and Google said in June 2025 that no AI system uses it.
- **Blocking AI training bots.** The site allows every crawler. You could block the training-only ones (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended) without losing search visibility. Leave the search ones alone (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot, Applebot), because blocking OAI-SearchBot alone takes the site out of ChatGPT search.

## Sources

- Google, AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google, service-area businesses: https://support.google.com/business/answer/9157481
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Anthropic crawlers: https://support.claude.com/en/articles/8896518
- Perplexity crawlers: https://docs.perplexity.ai/guides/bots
- Bing, AI Performance in Webmaster Tools: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- IndexNow FAQ: https://www.indexnow.org/faq
- Mueller on llms.txt: https://seroundtable.com/google-ai-llms-txt-39607.html
- Perplexity and Yelp: https://www.maginative.com/article/perplexity-enhances-ai-search-engine-with-direct-yelp-data-integration/
- ChatGPT search providers, vendor research (Peec): https://docs.peec.ai/research/chatgpt-search-result-providers
- Review sites and ChatGPT, vendor research (Whitespark): https://whitespark.ca/blog/want-to-rank-in-chatgpt-focus-on-these-review-sites-new-research/
- Brand mentions and AI Overviews, vendor research (Ahrefs): https://ahrefs.com/blog/ai-overview-brand-correlation/
