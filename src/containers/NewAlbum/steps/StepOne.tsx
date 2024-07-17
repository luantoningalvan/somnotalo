import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, useForm, useFormState } from "react-final-form";

export function StepOne() {
  const { values, submitting } = useFormState();
  const { submit } = useForm();

  return (
    <Box w="full" maxW="container.md">
      <Box
        bg="gray.700"
        borderWidth={1}
        borderColor="whiteAlpha.200"
        p={4}
        borderRadius="md"
      >
        <FormControl>
          <FormLabel>Nome do álbum</FormLabel>
          <Field
            name="name"
            render={({ input }) => (
              <Input placeholder="" size="lg" {...input} />
            )}
          />
        </FormControl>
      </Box>

      <Flex justifyContent="flex-end">
        <Button
          onClick={submit}
          mt={6}
          isDisabled={!values.name || submitting}
          isLoading={submitting}
        >
          Próximo
        </Button>
      </Flex>
    </Box>
  );
}
