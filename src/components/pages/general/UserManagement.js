import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import AgGrid from "../../../utils/AgGrid";
import Layout from "../../common/Layout";
import api from "../../../services/api";
import { ALL_USERS, REGISTER } from "../../../constants/apiRoutes";
import { formattedErrorMessage } from "../../../utils/formattedErrorMessage";
import useCustomToastr from "../../../utils/useCustomToastr";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField, PasswordField } from "../../formik";

const UserManagement = () => {
  const [gridApi, setGridApi] = React.useState(null);
  const [, setGridColumnApi] = React.useState(null);
  const [userData, setUserData] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const toast = useCustomToastr();
  const { isOpen: isCreateUserOpen, onOpen: onCreateUserOpen, onClose: onCreateUserClose } = useDisclosure();

  const columns = [
    {
      header: "S.No",
      accessor: "sno",
      width: 100,
    },
    {
      header: "First Name",
      accessor: "firstName",
      width: 200,
    },
    {
      header: "Last Name",
      accessor: "lastName",
      width: 200,
    },
    {
      header: "Email",
      accessor: "email",
      width: 250,
    },
    {
      header: "Admin",
      accessor: "isAdmin",
      width: 100,
      cellRenderer: (params) => <Switch size="sm" color="green" isChecked={params.value} onChange={() => params.setValue(!params.value)} />,
    },
    {
      header: "Created At",
      accessor: "createdAt",
      width: 250,
    },
    {
      header: "Actions",
      cellRenderer: (params) => (
        <Button
          size="sm"
          colorScheme="red"
          onClick={() =>
            api
              .remove(ALL_USERS + "/" + params.data.id)
              .then((response) => {
                toast.showSuccess(response.data.message);
                fetchUsers();
              })
              .catch((error) => {
                const e = formattedErrorMessage(error);
                toast.showError(e);
              })
          }
        >
          Delete
        </Button>
      ),
    },
  ];

  const rowData = useMemo(() =>
    userData.map(
      (item, index) => ({
        ...item,
        sno: index + 1,
        createdAt: new Date(item.createdAt).toLocaleString(),
      }),
      [userData]
    )
  );

  const fetchUsers = () => {
    api
      .get(ALL_USERS)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        const e = formattedErrorMessage(error);
        toast.showError(e);
      });
  };

  const updateUsers = () => {
    const data = [];
    gridApi.forEachNode((node) => data.push(node.data));

    setIsSubmitting(true);
    api
      .post(ALL_USERS, { users: data.filter((d, i) => d.isAdmin.toString() !== rowData[i].isAdmin.toString()) })
      .then(function (response) {
        toast.showSuccess(response.data.message);
        setIsSubmitting(false);
      })
      .then(() => fetchUsers())
      .catch((error) => {
        const formattedMessage = formattedErrorMessage(error);
        toast.showError(formattedMessage);
        setIsSubmitting(false);
      });
  };

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
        toast.showSuccess("User added successfully!");
        onCreateUserClose();
      })
      .catch((error) => {
        const e = formattedErrorMessage(error);
        toast.showError(e);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <Stack borderRadius="0.5em" p="1em" my="5" h="80vh" width="100%">
        <Heading fontSize="lg" fontWeight="medium">
          User Management
        </Heading>
        <Flex justifyContent="end" gap={4}>
          <Button colorScheme="blue" onClick={onCreateUserOpen}>
            Create New User
          </Button>
          <Modal isOpen={isCreateUserOpen} onClose={onCreateUserClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={registrationFormSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <Form autoComplete="off">
                      <Stack mx="3" spacing={5}>
                        <InputField isInline={false} direction="column" label="Email" name="email" isRequired />
                        <PasswordField isInline={false} direction="column" label="Password" name="password" isRequired />
                        <InputField
                          isInline={false}
                          direction="column"
                          name="firstName"
                          label="First Name"
                          placeholder="Enter First Name"
                        />
                        <InputField isInline={false} direction="column" name="lastName" label="Last Name" placeholder="Enter Last Name" />
                        {/* submit button */}
                        <Button colorScheme="green" type="submit" isLoading={props.isSubmitting}>
                          Add user
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button colorScheme="green" onClick={updateUsers} isLoading={isSubmitting}>
            Save changes
          </Button>
        </Flex>
        <Flex height="75vh" w="100%">
          <AgGrid rowHeight={80} columns={columns} data={rowData} setGridApi={setGridApi} setGridColumnApi={setGridColumnApi} />
        </Flex>
      </Stack>
    </Layout>
  );
};
export default UserManagement;
