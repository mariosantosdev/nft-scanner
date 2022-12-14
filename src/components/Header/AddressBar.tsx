import { Input, InputProps } from "@chakra-ui/react";

export const AddressBar: React.FC<InputProps> = (props) => {
  return (
    <Input
      type="search"
      placeholder="Enter the address of the wallet"
      w={{ base: 320, md: "full" }}
      maxW={480}
      rounded="full"
      variant="filled"
      color="black"
      _focus={{ color: "white" }}
      {...props}
    />
  );
};
