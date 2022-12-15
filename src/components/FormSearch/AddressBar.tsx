import { Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const AddressBar = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <Input
      ref={ref}
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
  )
);
