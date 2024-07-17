import React from "react";
import { Avatar, Button, HStack, Heading, chakra } from "@chakra-ui/react";
import { Paper } from "../../../components/Card";
import { FiEdit, FiTrash } from "react-icons/fi";
import { CropImageDialog, ImageState } from "../../../components/CropImage";
import api from "../../../services/api";
import { toast } from "react-hot-toast";
import { useConfirmation } from "../../../hooks/Confirmation";

export function UpdateArtistAvatar({ avatar }: { avatar: string }) {
  const [cropImage, setCropImage] = React.useState<null | ImageState>(null);
  const [preview, setPreview] = React.useState<string | null>(avatar);

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
    const isLoading = toast.loading("Atualizando foto do perfil...");

    try {
      const base64 = await fetch(data).then((res) => res.blob());

      const avatar = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(base64);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });

      const response = await api.patch("/update-profile/patch-avatar", {
        avatar: avatar.split(",")[1],
      });

      setPreview(response.data.avatar);

      toast.success("Foto do perfil atualizada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível atualizar a foto do perfil.");
    }

    toast.dismiss(isLoading);
  };

  const handleRemoveAvatar = async () => {
    confirm({
      title: "Remover foto do perfil",
      description: "Você tem certeza que deseja remover a foto do perfil?",
      primaryActionText: "Remover",
    }).then(async () => {
      const isLoading = toast.loading("Removendo foto do perfil...");

      try {
        await api.patch("/update-profile/patch-avatar", {
          avatar: null,
        });

        setPreview(null);

        toast.success("Foto do perfil removida com sucesso!");
      } catch (error) {
        toast.error("Não foi possível remover a foto do perfil.");
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
          aspect={1 / 1}
          shape="round"
        />
      )}

      <Heading size="sm" mb={4}>
        Foto do perfil
      </Heading>
      <HStack spacing={5} mt={4}>
        <Avatar size="xl" src={preview} bg="gray.600" />
        <Button leftIcon={<FiEdit />} onClick={() => inputRef?.current.click()}>
          Editar
        </Button>
        <Button
          leftIcon={<FiTrash />}
          onClick={handleRemoveAvatar}
          variant="outline"
          colorScheme="red"
        >
          Remover
        </Button>
        <chakra.input
          type="file"
          display="none"
          ref={inputRef}
          onChange={handleOpenFile}
        />
      </HStack>
    </Paper>
  );
}
