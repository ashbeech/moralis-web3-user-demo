import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import {
  Input,
  Button,
  Textarea,
  FormControl,
  FormErrorMessage,
  Box,
  Container,
  HStack,
  Center,
} from "@chakra-ui/react";
import MoonLoader from "../Misc/MoonLoader";
import { FaTelegramPlane, FaDiscord, FaTwitter } from "react-icons/fa";
import { Formik, Field, Form } from "formik";

const ContactForm = () => {
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
        Send
      </Button>
    );
  }

  const handleSubmit = async (e, a) => {
    setLoading(true);

    const { name, email, message } = e;
    let details = {
      name: name,
      email: email,
      message: message,
    };

    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    // result
    let result = await response.json();
    if (result === 200) {
      // trigger message

      setStatus(true);
      // reset
      setValid(false);
      setInitialValues({
        name: user ? user.attributes.ethAddress : " ",
        email: " ",
        message: " ",
      });
      setInitialValues({
        name: user ? user.attributes.ethAddress : "",
        email: "",
        message: "",
      });
      a.resetForm(initialValues);
      setLoading(false);
      // delay
      await new Promise((res) => setTimeout(res, 5000));
      setStatus(false);
    } else {
      // error
    }
  };

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

  function openLink(_url) {
    var link = ``;

    if (_url === "telegram") {
      link = `https://t.me/`;
    } else if (_url === "twitter") {
      link = `https://twitter.com/`;
    } else if (_url === "discord") {
      link = `https://discord.com/`;
    }
    window.open(link, "_blank");
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
                <Field name="message" validate={validate}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.message && form.touched.message}
                    >
                      <Textarea
                        {...field}
                        id="message"
                        name="message"
                        placeholder="Message"
                        mt={4}
                        variant="outline"
                        borderRadius={1}
                        borderColor="#FFF"
                        borderStyle="solid"
                      />
                      <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Center w="100%" h="100%">
                  {(setValid(!props.isValid), alertMsg)}
                </Center>
              </Form>
            </Box>

            <HStack className="flex-child" spacing=".75em">
              <Button
                variant="outline"
                borderRadius={1}
                colorScheme="brand"
                isFullWidth={false}
                isDisabled={true}
                onClick={() => openLink("telegram")}
              >
                {<FaTelegramPlane />}
              </Button>
              <Button
                variant="outline"
                borderRadius={1}
                colorScheme="brand"
                isFullWidth={false}
                isDisabled={true}
                onClick={() => openLink("twitter")}
              >
                {<FaTwitter />}
              </Button>
              <Button
                variant="outline"
                borderRadius={1}
                colorScheme="brand"
                isFullWidth={false}
                isDisabled={true}
                onClick={() => openLink("discord")}
              >
                {<FaDiscord />}
              </Button>
            </HStack>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
