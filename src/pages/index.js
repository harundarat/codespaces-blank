import Head from "next/head";
import { Container, Heading, Table, Spinner } from "@chakra-ui/react";
import { useProducts } from "@/features/product/useProducts";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  const renderProducts = () => {
    return products.map((product) => {
      return (
        <Table.Row key={product.id.toString()}>
          <Table.Cell>{product.id}</Table.Cell>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell>{product.description}</Table.Cell>
          <Table.Cell>{product.image}</Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <>
      <main>
        <Heading>Hello World</Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Image</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderProducts()}
            {isLoading ? <Spinner /> : null}
          </Table.Body>
        </Table.Root>
      </main>
    </>
  );
}
