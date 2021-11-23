// Non-functioning code for fascade example

import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Box,
  Container,
  Center,
} from "@chakra-ui/react";
import MoonLoader from "../Misc/MoonLoader";
import { Formik, Field, Form } from "formik";

const UserForm = () => {
  const { user } = useMoralis();

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: user ? user.attributes.ethAddress : "",
    email: "",
    message: "",
  });

  let alertMsg;

  if (status) {
    alertMsg = <Box className="chakra-button message success">Sent</Box>;
  } else {
    alertMsg = (
      <Button
        mt="1.5em"
        variant="link"
        isFullWidth={false}
        isLoading={loading}
        spinner={<MoonLoader />}
        isDisabled={valid}
        type="submit"
        textAlign="center"
      >
        Sign Up
      </Button>
    );
  }

  const handleSubmit = async (e, a) => {};

  function validate(value) {
    let error;
    if (!value) {
      error = "Your message is important";
    }
    return error;
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = "Please include your name";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Please include your contact email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "That's not an email 🧐";
    }
    return error;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validateOnMount={true}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values, { resetForm });
        }}
      >
        {(props) => (
          <Container className="flex-container">
            <Box className="flex-child">
              <Form>
                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        id="name"
                        className="first"
                        placeholder="Name"
                        mt={4}
                        borderRadius={1}
                        variant="outline"
                        borderColor="#FFF"
                        borderStyle="solid"
                        lineHeight={0.2}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email"
                        mt={4}
                        borderRadius={1}
                        variant="outline"
                        borderColor="#FFF"
                        borderStyle="solid"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validate}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <Input
                        {...field}
                        id="password"
                        placeholder="Password"
                        mt={4}
                        borderRadius={1}
                        variant="outline"
                        borderColor="#FFF"
                        borderStyle="solid"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="rpassword" validate={validate}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.rpassword && form.touched.rpassword
                      }
                    >
                      <Input
                        {...field}
                        id="rpassword"
                        placeholder="Repeat Password"
                        mt={4}
                        borderRadius={1}
                        variant="outline"
                        borderColor="#FFF"
                        borderStyle="solid"
                      />
                      <FormErrorMessage>
                        {form.errors.rpassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Center w="100%" h="100%">
                  {(setValid(!props.isValid), alertMsg)}
                </Center>
              </Form>
            </Box>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
