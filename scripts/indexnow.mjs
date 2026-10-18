// Tells Bing (and the other IndexNow engines) that the site's pages changed,
// so they recrawl them without waiting. ChatGPT search and Copilot both lean
// on Bing's index, which is most of why this is here.
//
// Run it after a deploy has finished, not before, or Bing fetches the old
// pages:
//
//   node scripts/indexnow.mjs
//
// The key is the file in public/ with the same name. Anyone can read it; it
// only proves we own the domain. If it's ever replaced, change KEY too.

const HOST = "azsoundsystem.com";
const KEY = "6646b657b1ae5ef3e3bcaa0c6a0e5d54";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs in the live sitemap, so nothing was sent.");
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean it was accepted. 403 means the key file isn't live yet.
console.log(`${response.status} ${response.statusText}, ${urlList.length} URLs`);
for (const url of urlList) console.log(`  ${url}`);
if (response.status >= 300) process.exit(1);
