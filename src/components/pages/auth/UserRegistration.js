import React, { useState } from "react";
import { useAuth } from "../../../services/auth";
import { Form, Formik } from "formik";
import { InputField, PasswordField, SelectField } from "../../formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import api from "../../../services/api";
import { REGISTER } from "../../../constants/apiRoutes";
import { formattedErrorMessage } from "../../../utils/formattedErrorMessage";
import useCustomToastr from "../../../utils/useCustomToastr";

const UserRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useCustomToastr();
  const [verified, setVerified] = useState(false);

  const registrationFormSchema = Yup.object().shape({
    email: Yup.string().min(2, "Too Short!").required("Required"),
    password: Yup.string().min(2, "Too Short!").required("Required"),
    firstName: Yup.string().min(2, "Too Short!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").required("Required"),
  });

  // Initial Values Displayed in Registration Form
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    api
      .post(REGISTER, values)
      .then((response) => {
        setSubmitting(false);
        toast.showSuccess("Registration Successful!");
        navigate("/login");
      })
      .catch((error) => {
        const e = formattedErrorMessage(error);
        toast.showError(e);
        setSubmitting(false);
      });
  };

  return user ? (
    <Navigate to={`/home`} replace />
  ) : (
    <Flex pos="fixed" top="0" left="0" right="0" bottom="0" zIndex={2}>
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold" cursor="pointer" p="6">
          SHAKTI HEROES
        </Text>
      </Link>
      <Flex
        w={"50%"}
        // eslint-disable-next-line no-undef
        backgroundImage={`url(${require("../../../assets/WelcomeImage.png")})`}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        d={{ sm: "none", lg: "flex" }}
        m="10"
      ></Flex>
      <Flex w={{ base: "100%", lg: "50%" }} direction="column" align="center" justify="center">
        <Text fontSize="2xl" fontWeight="600" textAlign="left">
          User Registration
        </Text>
        <Box w={"60%"} mt={10}>
          <Formik initialValues={initialValues} validationSchema={registrationFormSchema} onSubmit={onSubmit} enableReinitialize={true}>
            {(props) => (
              <Form autoComplete="off">
                <Stack mx="3" spacing={5}>
                  <InputField isInline={false} direction="column" label="Email" name="email" isRequired />
                  <PasswordField isInline={false} direction="column" label="Password" name="password" isRequired />
                  <InputField isInline={false} direction="column" name="firstName" label="First Name" placeholder="Enter First Name" />
                  <InputField isInline={false} direction="column" name="lastName" label="Last Name" placeholder="Enter Last Name" />
                  {/* submit button */}
                  <Button colorScheme="green" type="submit" isLoading={props.isSubmitting}>
                    Register
                  </Button>
                  <Link to="/login">
                    <Text fontSize="sm">Back to Login</Text>
                  </Link>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserRegistration;
