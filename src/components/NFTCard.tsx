import { Card, CardBody, Flex, Heading, Image, Stack } from "@chakra-ui/react";

interface NFTCardProps {
  image: string;
  name: string;
}

export const NFTCard: React.FC<NFTCardProps> = ({ image, name }) => {
  return (
    <Card maxW="xs" bg="gray.800" color="white">
      <CardBody as={Flex} flexDir="column" alignItems="center">
        <Image src={image} alt={name} borderRadius="lg" objectFit="cover" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
        </Stack>
      </CardBody>
    </Card>
  );
};
