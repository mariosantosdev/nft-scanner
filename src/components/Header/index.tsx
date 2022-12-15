import { Container, Flex } from "@chakra-ui/react";

import { Logo } from "~/components/Logo";

export const Header: React.FC = () => {
  return (
    <Flex as="header" px={10} py={2} bg="gray.800" w="full">
      <Container
        as={Flex}
        flexDir={{ base: "column", sm: "row" }}
        gap={2}
        maxW="container.xl"
        alignItems="center"
        justifyContent="space-between"
      >
        <Logo />
      </Container>
    </Flex>
  );
};
