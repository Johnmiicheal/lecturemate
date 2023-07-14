import { Box, Flex, Icon, Text, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxUpload, RxFile } from "react-icons/rx";
import { useState } from "react";
import CopyBox from "./CopyBox";

interface FormValues {
  file: File | null;
}

const FileUpload = () => {
  const toast = useToast();
  const router = useRouter();
  const [token, setToken] = useState('');
  const formik = useFormik<FormValues>({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        try {
          const response = await axios.post(
            "https://api.greynote.app/lecture",
            formData
          );
          console.log("Id: ", response.data.uniqueId);
          if (response.status === 200) {
            toast({
              title: "Notes Uploaded",
              position: "top-right",
              description: "We've successfully uploaded your notes",
              status: "success",
              variant: "left-accent",
              duration: 5000,
              isClosable: true,
            });
            setToken(response.data.uniqueId);
          } else {
            toast({
                title: "Upload Error",
                position: "top",
                description: "We were unable to upload your note",
                status: "error",
                variant: "left-accent",
                duration: 5000,
                isClosable: true,
              });
            //   setTimeout(() => {
            //     router.reload();
            //   }, 1000);
          }
          console.log("Upload successful:", response.data);
        } catch (error) {
            if(error){
                toast({
                    title: "Upload Error",
                    position: "top-right",
                    description: "We were unable to upload your note",
                    status: "error",
                    variant: "left-accent",
                    duration: 5000,
                    isClosable: true,
                  });
            }
          console.error("Upload error:", error);
        }
      }
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("file", acceptedFiles[0]);
    },
  });

  return (
    <Flex direction="column">
      <Box
        p={4}
        h="15vh"
        border="2px dotted"
        borderColor={isDragActive ? "green.500" : "gray.300"}
        borderRadius="md"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        gap={4}
        mb={14}
        justifyItems="center"
        alignItems="center"
        _hover={{ bg: "#E2F0E2" }}
        {...getRootProps()}
      >
        <Icon as={RxUpload} mt={2} w="8" h="8" color="#202020" />
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text color="green.500">Drop the file here</Text>
        ) : (
          <Text color="#202020">
            Drag and drop a file here, or click to select a file
          </Text>
        )}
        {formik.values.file && (
          <Flex mt={10} align="center" gap={1}>
            <Icon as={RxFile} w="4" h="4" />
            <Text fontWeight="bold">
              Selected File: {formik.values.file.name}
            </Text>
          </Flex>
        )}
      </Box>
      <Button
        type="submit"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault(); // Prevent the default form submission behavior
          formik.handleSubmit();
        }}
        color="#53AF28"
        border="1px solid #53AF28"
        _hover={{ bg: "#53AF28", color: "white" }}
        variant="outline"
        disabled={!formik.values.file}
        isLoading={formik.isSubmitting}
      >
        Upload
      </Button>
      <Flex display={!formik.values.file ? 'none' : 'block'} mt={2}>
        <CopyBox content={token} height={10} />
      </Flex>
    </Flex>
  );
};

export default FileUpload;
