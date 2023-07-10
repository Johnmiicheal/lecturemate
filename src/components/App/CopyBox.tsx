import { Box, Flex, Icon, IconButton, useClipboard } from "@chakra-ui/react";
import React from "react";
import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";

interface CopyBoxProps {
  content: string;
  width?: string | number;
  height?: string | number;
}

const CopyBox: React.FC<CopyBoxProps> = ({ content, width, height }) => {
  const { hasCopied, onCopy } = useClipboard(content);

  return (
    <Flex
      align="center"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w={width} h={height}
      p={2}
      cursor="text"
    >
      <Box p={2} mr={2} flexGrow={1}>
        {content}
      </Box>
      <IconButton
        aria-label="Copy"
        icon={hasCopied ? <IoCheckmarkOutline /> : <IoCopyOutline />}
        onClick={onCopy}
        variant="ghost"
      />
    </Flex>
  );
};

export default CopyBox;
