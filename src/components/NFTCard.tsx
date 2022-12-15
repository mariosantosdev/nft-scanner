import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";

interface NFTCardProps {
  image: string;
  name: string;
  description?: string;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  image,
  name,
  description,
}) => {
  return (
    <Card maxW="xs" bg="gray.800" color="white">
      <CardBody as={Flex} flexDir="column" alignItems="center">
        <Image
          src={image}
          alt={name}
          borderRadius="lg"
          objectFit="cover"
          fallback={<Skeleton />}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          {description && (
            <Text noOfLines={4} overflow="hidden" textOverflow="ellipsis">
              {description}
            </Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
