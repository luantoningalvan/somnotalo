import { Box, BoxProps } from "@chakra-ui/react";

export function Paper({ children, ...rest }: BoxProps) {
  return (
    <Box
      bg="gray.700"
      borderWidth={1}
      borderColor="whiteAlpha.200"
      borderRadius="md"
      p={4}
      {...rest}
    >
      {children}
    </Box>
  );
}
