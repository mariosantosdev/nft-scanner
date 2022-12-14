import { Flex, Heading, Image } from "@chakra-ui/react";

export const Logo: React.FC = () => {
  return (
    <Flex flexDir="row" alignItems="center" gap={2}>
      <Image
        maxW="12"
        src="/favicon.ico"
        alt="Logo"
        display={{ base: "none", md: "block" }}
      />
      <Heading fontSize={{ base: "xl" }}>NFT Scanner</Heading>
    </Flex>
  );
};
