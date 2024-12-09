// src/app/page.tsx
import { Item } from "./details/[id]/page";

interface HomeProps {
  items: Item[];
}



export default function Home({ items }: HomeProps) {

  const itemsExample = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 3" },
  ];


  const safeItems = items || itemsExample;

  return (
    <div>
      <h1>Lista de Itens</h1>
      <ul>
        {safeItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}


export async function generateStaticProps() {
  const items: Item[] = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
  ];

  return {
    props: {
      items,
    },
  };
}
