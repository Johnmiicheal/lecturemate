import { Box, Flex, Icon, Text, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxUpload, RxFile } from "react-icons/rx";
import React, { useState, useEffect, Suspense } from "react";
import CopyBox from "./CopyBox";
import TopBarProgress from "react-topbar-progress-indicator";
import { createClient } from "@supabase/supabase-js";

const supaUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supaUrl, supaKey);

interface FormValues {
  file: File | null;
}

const FileUpload = ({ user3 }: any) => {
  const toast = useToast();
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const texts = [
    "Uploading...",
    "Please wait...",
    "Almost there...",
    "Any minute now...",
    "Few seconds left...",
    "Approaching light speed...",
    "Initiating hyperdrive...",
    "Processing...",
  ];
  const bucketName = "pdfFiles"; // Replace with your actual bucket name

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer % 40 === 0) {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }
  }, [timer]);

  const formik = useFormik<FormValues>({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      if (values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        // formData.append("userId", user3.id);
        try {
          setUploading(true);
          const { data, error } = await supabase.storage
          .from(bucketName + "/" + user3.id)
          .upload(values.file.name, values.file);

          if (!error) {
            // alert(values.file.name);
            setTimer(0);
            setTextIndex(0);
            localStorage.setItem("file", data.path);
            toast({
              title: "Notes Uploaded",
              position: "top-right",
              description: "We've successfully uploaded your notes🎉🎉",
              status: "success",
              variant: "left-accent",
              duration: 5000,
              isClosable: true,
            });
            setUploading(false);
          } else {
            setUploading(false);
            toast({
              title: "Upload Error",
              position: "top",
              description: error.message,
              status: "error",
              variant: "left-accent",
              duration: 5000,
              isClosable: true,
            });
            //   setTimeout(() => {
            //     router.reload();
            //   }, 1000);
          }
          console.log("Upload successful:", data);
        } catch (error) {
          if (error) {
            setUploading(false);
            setTimer(0);
            setTextIndex(0);
            toast({
              title: "Upload Error",
              position: "top-right",
              description: "We were unable to upload your note😞",
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
      {uploading && <TopBarProgress />}
      <Box
        p={4}
        h="17vh"
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
          <Flex mt={7} align="center" gap={1}>
            <Icon as={RxFile} w="4" h="4" />
            <Text fontWeight="bold">
              Selected File: {formik.values.file.name}
            </Text>
          </Flex>
        )}
      </Box>
      <Button
        type="submit"
        mt={4}
        // onClick={handleFormSubmit}
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
      {formik.isSubmitting && (
        <Text fontSize="20" textAlign="center" mt={4}>
          {texts[textIndex]}
        </Text>
      )}
      {/* <Flex display={!formik.values.file ? 'none' : 'block'} mt={2}>
        <CopyBox content={token} height={10} />
      </Flex> */}
    </Flex>
  );
};

export default FileUpload;
