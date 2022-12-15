import { Container, Flex, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { FormSearch } from "~/components/FormSearch";

import { Header } from "~/components/Header";
import { NFTCard } from "~/components/NFTCard";
import { useNfts } from "~/context/NftsContext";

export default function Home() {
  const { nfts, loading } = useNfts();

  return (
    <Flex flexDir="column">
      <Head>
        <title>NFT Scanner</title>
        <meta
          name="description"
          content="App create to scan nfts of an contract ERC-721"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container maxW="container.xl" px={4} my={12}>
        <FormSearch />

        {nfts.length > 0 && !loading ? (
          <Text mb={2}>Total de tokens: {nfts.length}</Text>
        ) : null}
        <SimpleGrid as="ul" columns={{ base: 1, md: 3, lg: 4 }} gap={4}>
          {loading &&
            [...Array(8)].map((_, index) => (
              <Skeleton key={index}>
                <NFTCard name="nft" image="/favicon.ico" />
              </Skeleton>
            ))}

          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              image={nft.image}
              name={nft.name}
              description={nft?.description}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
