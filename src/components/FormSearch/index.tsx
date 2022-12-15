import { Button, Flex, Link, Text, useClipboard } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import web3 from "web3";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNfts } from "~/context/NftsContext";
import { AddressBar } from "./AddressBar";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type FormData = {
  address: string;
};

const schema = yup.object().shape({
  address: yup
    .string()
    .required("Wallet address is required")
    .test(
      "is-address",
      "Invalid wallet address",
      (value) => web3.utils.isAddress(value!) === true
    ),
});

export const FormSearch: React.FC = () => {
  const { getNfts, loading } = useNfts();
  const { onCopy } = useClipboard("0xD472B0798421159999E3dB0Aaa2D53bC0D7aCfa3");

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async ({ address }) => {
    resetField("address");
    await getNfts(address);
  };

  const copyExampleAddress = () => {
    onCopy();
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    if (errors.address?.message) toast.error(errors.address.message);
  }, [errors]);

  return (
    <Flex
      as="form"
      flexDir="column"
      onSubmit={handleSubmit(onSubmit)}
      p={6}
      bg="gray.800"
      w="full"
      mb={8}
      rounded="md"
      gap={4}
      justifyContent="center"
      textAlign="center"
    >
      <Text fontSize="lg" textTransform="uppercase" fontWeight="light">
        This scanner get all nfts by ownership of this{" "}
        <Link
          color="pink.500"
          target="_blank"
          href="https://etherscan.io/address/0x18df6c571f6fe9283b87f910e41dc5c8b77b7da5"
        >
          contract
        </Link>
      </Text>

      <Flex gap={2} flexWrap="wrap" justifyContent="center">
        <AddressBar {...register("address")} />
        <Button type="submit" colorScheme="pink" isLoading={loading}>
          Search
        </Button>
      </Flex>

      <Text>
        Example Address: {""}
        <Text
          as="span"
          role="button"
          color="pink.500"
          onClick={copyExampleAddress}
        >
          0xD472B0798421159999E3dB0Aaa2D53bC0D7aCfa3
        </Text>
      </Text>
    </Flex>
  );
};
