import styles from "./index.module.css";

function CardComponent({
  link,
  title,
  content,
  date,
  source,
}: {
  link: string;
  title: string;
  content: string;
  date: string;
  source: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        {date ? new Date(date).toLocaleString() : "No date"} — {source}
      </p>
    </a>
  );
}

export { CardComponent as Card };
