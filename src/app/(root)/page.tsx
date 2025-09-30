import { getFeedItems } from "@/lib/feedItems";
import { Card } from "@/components/card";
import styles from "./page.module.css";
import { Suspense } from "react";

export default async function Page() {
  const items = await getFeedItems();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest Updates Web</h1>
      <Suspense fallback={<p>loading...</p>}>
        <div className={styles.cards}>
          {items.map((item) => (
            <Card
              key={Math.random() + "#" + item.date}
              link={item.link}
              title={item.title}
              content={item.content}
              date={item.date || "none"}
              source={item.source}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
