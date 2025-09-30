import Parser from "rss-parser";
import { feeds } from "./feeds";

type FeedItem = {
  title: string;
  link: string;
  content: string;
  date: string | null;
  source: string;
};

async function getFeedItems(): Promise<FeedItem[]> {
  const parser: Parser = new Parser();
  let allItems: FeedItem[] = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      const source = feed.title || url;

      const items: FeedItem[] = (feed.items || []).slice(0, 10).map((item) => {
        const rawContent = item.contentSnippet ?? item.content ?? "";
        const preview =
          rawContent.length > 250 ? rawContent.slice(0, 250) + "…" : rawContent;

        return {
          title: item.title ?? "No title",
          link: item.link ?? "#",
          content: preview,
          date: item.isoDate ?? item.pubDate ?? null,
          source,
        };
      });

      allItems = [...allItems, ...items];
    } catch (err) {
      console.error("Error fetching:", url, err);
    }
  }

  return allItems
    .filter((i) => i.date !== null)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
}

export { getFeedItems };
