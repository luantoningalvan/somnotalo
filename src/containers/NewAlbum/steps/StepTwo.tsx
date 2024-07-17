import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";
import { CropImageDialog, ImageState } from "../../../components/CropImage";
import { useForm, useFormState } from "react-final-form";

export function StepTwo() {
  const { change, submit } = useForm();
  const { values, submitting } = useFormState();
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [cropImage, setCropImage] = React.useState<null | ImageState>(null);
  const [preview, setPreview] = React.useState<string | null>(values.cover);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenFile = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDragActive(false);
    setCropImage({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleUpdate = (data: string) => {
    setPreview(data);
    change("cover", data);
  };

  const handleRemoveCover = () => {
    setPreview(null);
    change("cover", null);
  };

  return (
    <>
      {cropImage !== null && (
        <CropImageDialog
          open={cropImage !== null}
          onClose={() => setCropImage(null)}
          image={cropImage}
          onUpdate={handleUpdate}
          aspect={1 / 1}
          shape="rect"
        />
      )}

      <Box w="450px">
        {preview ? (
          <Image
            borderRadius="md"
            borderWidth={3}
            borderColor="whiteAlpha.200"
            borderStyle="dashed"
            h="450px"
            w="450px"
            src={preview}
          />
        ) : (
          <Center
            bg={isDragActive ? "#0c324a" : "gray.700"}
            borderRadius="md"
            borderWidth={3}
            borderColor="whiteAlpha.200"
            borderStyle="dashed"
            flexDir="column"
            p={4}
            h="450px"
            cursor="pointer"
            pos="relative"
          >
            {isDragActive ? (
              <Text color="whiteAlpha.900" fontSize="lg">
                Solte a imagem aqui
              </Text>
            ) : (
              <>
                <FiImage size={32} />
                <Text fontSize="lg" mt={4}>
                  Enviar capa do álbum
                </Text>
                <Text fontSize="sm" color="whiteAlpha.500" mt={1}>
                  ou arraste o arquivo aqui
                </Text>
              </>
            )}
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              cursor="pointer"
              onChange={handleOpenFile}
              onDragEnter={() => setIsDragActive(true)}
              onDragLeave={() => setIsDragActive(false)}
              ref={inputRef}
            />
          </Center>
        )}

        {preview && (
          <Flex justifyContent="center" gap={4}>
            <Button
              mt={6}
              colorScheme="red"
              variant="outline"
              onClick={handleRemoveCover}
            >
              Remover imagem
            </Button>
            <Button
              onClick={submit}
              mt={6}
              isDisabled={!values.name || submitting}
              isLoading={submitting}
            >
              Próximo
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
}
