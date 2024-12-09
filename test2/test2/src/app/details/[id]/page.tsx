// src/app/details/[id]/page.tsx
import { notFound } from "next/navigation";

export interface Item {
  id: number;
  title: string;
  description: string;
}

export interface ItemDetailsProps {
  item: Item | null; // Permite que o item seja null se não for encontrado
}

export default function ItemDetails({ item }: ItemDetailsProps) {
  if (!item) {
    notFound(); // Lida com item não encontrado
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  );
}

// Função para gerar os parâmetros dinâmicos para as rotas
export async function generateStaticParams() {
  // Simula uma busca de dados para detalhes de itens
  const items = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 3" },
  ];

  // Retorna os parâmetros dinâmicos para as rotas
  return items.map((item) => ({
    id: item.id.toString(),
  }));
}

// Função para buscar o item com base no ID
export async function getItemById(id: string) {
  const items = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 3" },
  ];

  // Retorna o item com o ID correspondente
  return items.find((item) => item.id === parseInt(id));
}

// Função para gerar metadados para a página de detalhes
export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = await getItemById(params.id);
  if (!item) {
    notFound();
  }
  return {
    title: item.title,
  };
}

// A função getServerSideProps pode ser usada para buscar dados dinamicamente no Next.js 13, mas, com a nova estrutura do app, geralmente você pode usar a lógica diretamente dentro da função de página.
