// Renders one or more JSON-LD <script> blocks. Google reads structured data
// from anywhere in the document, so we render inline next to <SEO />.
// dangerouslySetInnerHTML avoids React escaping the JSON string.
type Props = { data: object | object[] };

export default function JsonLd({ data }: Props) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
