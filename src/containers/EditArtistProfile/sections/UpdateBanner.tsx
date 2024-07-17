import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  chakra,
} from "@chakra-ui/react";
import { Paper } from "../../../components/Card";
import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useConfirmation } from "../../../hooks/Confirmation";
import { CropImageDialog, ImageState } from "../../../components/CropImage";
import api from "../../../services/api";

export function UpdateArtistBanner({ banner }: { banner: string }) {
  const [cropImage, setCropImage] = React.useState<null | ImageState>(null);
  const [preview, setPreview] = React.useState<string | null>(banner);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const confirm = useConfirmation();

  const handleOpenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCropImage({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
    inputRef.current.value = "";
  };

  const handleUpdate = async (data: string) => {
    const isLoading = toast.loading("Atualizando o banner...");

    try {
      const base64 = await fetch(data).then((res) => res.blob());

      const banner = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(base64);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });

      const response = await api.patch("/update-profile/patch-banner", {
        banner: banner.split(",")[1],
      });

      setPreview(response.data.cover);

      toast.success("Banner atualizado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível atualizar o banner.");
    }

    toast.dismiss(isLoading);
  };

  const handleRemoveBanner = async () => {
    confirm({
      title: "Remover banner",
      description: "Você tem certeza que deseja remover o banner?",
      primaryActionText: "Remover",
    }).then(async () => {
      const isLoading = toast.loading("Removendo o banner...");

      try {
        await api.patch("/update-profile/patch-banner", {
          banner: null,
        });

        setPreview(null);

        toast.success("Banner removido com sucesso!");
      } catch (error) {
        toast.error("Não foi possível remover o banner.");
      }

      toast.dismiss(isLoading);
    });
  };

  return (
    <Paper>
      {cropImage !== null && (
        <CropImageDialog
          open={cropImage !== null}
          onClose={() => setCropImage(null)}
          image={cropImage}
          onUpdate={handleUpdate}
          aspect={12 / 5}
          shape="rect"
        />
      )}

      <Heading size="sm" mb={4}>
        Banner
      </Heading>
      <Box pos="relative">
        <chakra.input
          type="file"
          display="none"
          ref={inputRef}
          onChange={handleOpenFile}
        />
        {preview !== null ? (
          <>
            <Image src={preview} h="auto" w="full" />
            <Flex
              gap={4}
              justifyContent="flex-end"
              pos="relative"
              zIndex={1}
              px={4}
              boxSizing="border-box"
              alignItems="center"
              h="56px"
              mt="-56px"
              w="full"
              bg="blackAlpha.500"
            >
              <Button
                size="sm"
                leftIcon={<FiEdit />}
                onClick={() => inputRef?.current.click()}
              >
                Editar
              </Button>
              <Button
                leftIcon={<FiTrash />}
                variant="outline"
                colorScheme="red"
                onClick={handleRemoveBanner}
                size="sm"
              >
                Remover
              </Button>
            </Flex>
          </>
        ) : (
          <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            p={8}
            gap={4}
          >
            <Text color="gray.500">Nenhum banner adicionado</Text>
            <Button
              size="sm"
              leftIcon={<FiPlus />}
              onClick={() => inputRef?.current.click()}
            >
              Adicionar banner
            </Button>
          </Flex>
        )}
      </Box>
    </Paper>
  );
}
