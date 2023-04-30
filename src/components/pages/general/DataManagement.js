import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import Layout from "../../common/Layout";
import api from "../../../services/api";
import { NEWDATA } from "../../../constants/apiRoutes";
import { formattedErrorMessage } from "../../../utils/formattedErrorMessage";
import useCustomToastr from "../../../utils/useCustomToastr";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField, NumberField, PasswordField } from "../../formik";

const DataManagement = () => {
  const toast = useCustomToastr();

  const registrationFormSchema = Yup.object().shape({
    orderId: Yup.string().min(2, "Too Short!").required("Required"),
    orderDate: Yup.string().min(2, "Too Short!").required("Required"),
    shipDate: Yup.string().min(2, "Too Short!").required("Required"),
    shipMode: Yup.string().min(2, "Too Short!").required("Required"),
    customerId: Yup.string().min(2, "Too Short!").required("Required"),
    customerName: Yup.string().min(2, "Too Short!").required("Required"),
    segment: Yup.string().min(2, "Too Short!").required("Required"),
    country: Yup.string().min(2, "Too Short!").required("Required"),
    city: Yup.string().min(2, "Too Short!").required("Required"),
    state: Yup.string().min(2, "Too Short!").required("Required"),
    postalCode: Yup.string().min(2, "Too Short!").required("Required"),
    region: Yup.string().min(2, "Too Short!").required("Required"),
    productId: Yup.string().min(2, "Too Short!").required("Required"),
    category: Yup.string().min(2, "Too Short!").required("Required"),
    subCategory: Yup.string().min(2, "Too Short!").required("Required"),
    productName: Yup.string().min(2, "Too Short!").required("Required"),
    sales: Yup.number().required("Required"),
  });

  const initialValues = {
    orderId: "",
    orderDate: "",
    shipDate: "",
    shipMode: "",
    customerId: "",
    customerName: "",
    segment: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    region: "",
    productId: "",
    category: "",
    subCategory: "",
    productName: "",
    sales: 0,
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    api
      .post(NEWDATA, values)
      .then((response) => {
        setSubmitting(false);
        toast.showSuccess("Data added successfully!");
      })
      .catch((error) => {
        const e = formattedErrorMessage(error);
        toast.showError(e);
        setSubmitting(false);
      });
  };

  return (
    <Layout>
      <Stack borderRadius="0.5em" p="1em" my="5" width="100%">
        <Formik initialValues={initialValues} validationSchema={registrationFormSchema} onSubmit={onSubmit} enableReinitialize={true}>
          {(props) => (
            <Form autoComplete="off">
              <Stack mx="3" spacing={5}>
                <InputField isInline={false} direction="column" label="Order ID" name="orderId" isRequired />
                <InputField isInline={false} direction="column" label="Order Date" name="orderDate" placeholder="YYYY/MM/DD" isRequired />
                <InputField isInline={false} direction="column" label="Ship Date" name="shipDate" isRequired />
                <InputField isInline={false} direction="column" label="Ship Mode" name="shipMode" isRequired />
                <InputField isInline={false} direction="column" label="Customer ID" name="customerId" isRequired />
                <InputField isInline={false} direction="column" label="Customer Name" name="customerName" isRequired />
                <InputField isInline={false} direction="column" label="Segment" name="segment" isRequired />
                <InputField isInline={false} direction="column" label="Country" name="country" isRequired />
                <InputField isInline={false} direction="column" label="City" name="city" isRequired />
                <InputField isInline={false} direction="column" label="State" name="state" isRequired />
                <InputField isInline={false} direction="column" label="Postal Code" name="postalCode" isRequired />
                <InputField isInline={false} direction="column" label="Region" name="region" isRequired />
                <InputField isInline={false} direction="column" label="Product ID" name="productId" isRequired />
                <InputField isInline={false} direction="column" label="Category" name="category" isRequired />
                <InputField isInline={false} direction="column" label="Sub Category" name="subCategory" isRequired />
                <InputField isInline={false} direction="column" label="Product Name" name="productName" isRequired />
                <NumberField isInline={false} direction="column" label="Sales" name="sales" isRequired />
                {/* submit button */}
                <Button colorScheme="green" type="submit" isLoading={props.isSubmitting}>
                  Add user
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Layout>
  );
};
export default DataManagement;
