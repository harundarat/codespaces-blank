import {
  Heading,
  Table,
  Spinner,
  Fieldset,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useFormik } from "formik";
import { useFetchProducts } from "@/features/product/useFetchProducts";
import { useCreateProduct } from "@/features/product/useCreateProduct";

export default function Home() {
  const {
    data: products,
    isLoading: fetchProductsIsLoading,
    refetch: refetchProducts,
  } = useFetchProducts();

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: 0,
      description: "",
      image: "",
    },
    onSubmit: () => {
      const { productName: name, price, description, image } = formik.values;
      mutate({ name, price: parseInt(price), description, image });
      formik.setFieldValue("productName", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
    },
  });

  const { mutate, isLoading: createProductsIsLoading } = useCreateProduct({
    onSuccess: async () => {
      await refetchProducts();

      toaster.create({
        title: "Data added successfully!",
        description: `${name} successfully added!`,
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Failed to add data!",
        description: "Something was wrong. Please try again later!",
        type: "error",
      });
    },
  });

  const handleFormInput = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const renderProducts = () => {
    return products?.data?.map((product) => {
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
        <Toaster />
        <Heading>Hello World</Heading>
        {fetchProductsIsLoading ? <Spinner /> : <></>}
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
          <Table.Body>{renderProducts()}</Table.Body>
        </Table.Root>

        <form onSubmit={formik.handleSubmit}>
          <Fieldset.Root>
            <VStack marginLeft={40} marginRight={40} marginTop={10} gap={4}>
              <Fieldset.Legend>Product Details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below
              </Fieldset.HelperText>
            </VStack>

            <Fieldset.Content>
              <VStack
                marginLeft={40}
                marginRight={40}
                marginBottom={10}
                gap={4}
              >
                <Field label="Product Name">
                  <Input
                    onChange={handleFormInput}
                    name="productName"
                    value={formik.values.productName}
                  />
                </Field>

                <Field label="Price">
                  <Input
                    onChange={handleFormInput}
                    name="price"
                    value={formik.values.price}
                  />
                </Field>

                <Field label="Description">
                  <Input
                    onChange={handleFormInput}
                    name="description"
                    value={formik.values.description}
                  />
                </Field>

                <Field label="Image">
                  <Input
                    onChange={handleFormInput}
                    name="image"
                    value={formik.values.image}
                  />
                </Field>
                {createProductsIsLoading ? (
                  <Spinner />
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </VStack>
            </Fieldset.Content>
          </Fieldset.Root>
        </form>
      </main>
    </>
  );
}
