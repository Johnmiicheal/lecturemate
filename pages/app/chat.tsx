import {
  Text,
  Flex,
  useDisclosure,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Divider,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../../src/components/App/Layout";
import { IoAdd, IoPaperPlaneOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";

const Chat = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(!showInput);
  };
  const sponsors = [
    { name: "Sky Waiters", img: "/skywaiter.png", role: "Investor", link: "#" },
  ];
  return (
    <>
      <Flex bg="#F8FCF7">
        <Flex w="full" direction="column" justify="space-between">
          <Layout />
          <Flex direction="column" w="full" align="center">
            <Flex
              direction="column"
              h="100vh"
              w="300px"
              bg="white"
              ml="130px"
              mr="auto"
              px={5}
              justify="space-between"
              display={{ base: "none", lg: "block" }}
            >
              <Flex
                w="full"
                h="20px"
                mt={20}
                align="center"
                justify="start"
                color="#53AF28"
                border="1px solid #53AF28"
                _hover={{ bg: "#53AF28", color: "white" }}
                py={5}
                pl={3}
                borderRadius="md"
                cursor="pointer"
                onClick={() => router.push("/app/chat")}
              >
                <Icon as={IoAdd} w="5" h="5" />
                Upload Note
              </Flex>

              <Flex direction="column" justify="center" mb={10} bottom={10} pos="fixed">
                <Divider w="260px" />
                <Text color="#808680">Sponsored by</Text>
                {sponsors.map((p) => (
                  <Flex align="center" key={p.name} gap={2} mt={5}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      w="50px"
                      borderRadius="md"
                    />
                    <Box gap={1}>
                    <Text fontWeight={600}>{p.name}</Text>
                    <Text>{p.role}</Text>
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Flex
              direction="column"
              //   w="1200px"
              pos="fixed"
              bottom="10"
              align="center"
              ml={{ base: "130px", lg: "320px" }}
            >
              <Formik
                initialValues={{ message: "", token: "" }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="message">
                      {({ field, form }: any) => (
                        <FormControl>
                          <InputGroup>
                            <Input
                              bg="#E2F0E2"
                              {...field}
                              h="60px"
                              w={{base: "300px",md: "600px", lg: "800px"}}
                              borderRadius="md"
                              placeholder="What would you like to ask?"
                              focusBorderColor="#005103"
                            />
                            <InputRightElement>
                              <IconButton
                                icon={<IoPaperPlaneOutline />}
                                variant="ghost"
                                aria-label="send message"
                                w="6"
                                h="6"
                                mt={5}
                                mr={7}
                                type="submit"
                                isLoading={props.isSubmitting}
                                color="#808680"
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Flex>
                      <Button onClick={handleClick} mt={2} mr={2}>
                        {showInput ? "Hide Token" : "Show Token"}
                      </Button>
                      <Field name="token">
                        {({ field, form }: any) => (
                          <FormControl>
                            {showInput && (
                              <Input
                                mt={2}
                                {...field}
                                focusBorderColor="#005103"
                                placeholder="Input Token here"
                              />
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Chat;