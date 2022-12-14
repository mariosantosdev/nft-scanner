import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Flex>
      <Head>
        <title>NFT Scanner</title>
        <meta
          name="description"
          content="App create to scan nfts of an contract ERC-721"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text>Hello, World!</Text>
    </Flex>
  );
}
