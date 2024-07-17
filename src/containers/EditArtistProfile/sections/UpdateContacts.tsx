import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Paper } from "../../../components/Card";
import { FiPlusCircle, FiX } from "react-icons/fi";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { FormApi } from "final-form";
import api from "../../../services/api";
import { toast } from "react-hot-toast";

type FormData = {
  contacts: {
    type: string;
    value: string;
  }[];
};
export function UpdateArtistContacts({
  contacts,
}: {
  contacts: FormData["contacts"];
}) {
  const handleSubmitContactsForm = async (data: FormData, form: FormApi) => {
    const isLoading = toast.loading("Atualizando os contatos...");

    try {
      const contacts = Object.values(data.contacts).reduce((acc, value) => {
        if (!value.type || !value.value) return acc;
        acc[value.type] = value.value;
        return acc;
      }, {});

      await api.patch("update-profile/patch-contacts", { contacts });

      form.reset(data);

      toast.success("Contatos atualizados com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar os contatos");
    }

    toast.dismiss(isLoading);
  };

  return (
    <Paper>
      <Heading size="sm" mb={4}>
        Sites e links sociais
      </Heading>
      <Form
        onSubmit={handleSubmitContactsForm}
        initialValues={{ contacts }}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit, submitting }) => (
          <FieldArray name="contacts">
            {({ fields, meta }) => (
              <>
                {fields.length === 0 && (
                  <Text color="gray.500">Nenhum contato adicionado</Text>
                )}

                <VStack spacing={4} alignItems="flex-start">
                  {fields.map((name, index) => (
                    <HStack key={name} spacing={4} w="full">
                      <Field
                        name={`${name}.type`}
                        render={({ input }) => (
                          <Select {...input}>
                            <option value="">Selecione um tipo</option>
                            <option value="email">E-mail</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="telegram">Telegram</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="youtube">YouTube</option>
                            <option value="twitter">Twitter</option>
                            <option value="tiktok">TikTok</option>
                            <option value="soundcloud">SoundCloud</option>
                            <option value="spotify">Spotify</option>
                            <option value="twitch">Twitch</option>
                            <option value="link">Link</option>
                          </Select>
                        )}
                      />
                      <Field
                        name={`${name}.value`}
                        render={({ input }) => (
                          <Input placeholder="Link ou número" {...input} />
                        )}
                      />

                      <IconButton
                        colorScheme="gray"
                        aria-label="Remover"
                        icon={<FiX />}
                        type="button"
                        onClick={() => fields.remove(index)}
                      />
                    </HStack>
                  ))}

                  <Flex
                    mt={4}
                    justifyContent="space-between"
                    alignItems="center"
                    w="full"
                  >
                    <Button
                      onClick={() => fields.push({ type: "", value: "" })}
                      variant="link"
                      leftIcon={<FiPlusCircle />}
                    >
                      Adicionar novo
                    </Button>

                    {fields.length > 0 && (
                      <Button
                        isDisabled={meta.pristine || submitting}
                        isLoading={submitting}
                        onClick={handleSubmit}
                      >
                        Salvar
                      </Button>
                    )}
                  </Flex>
                </VStack>
              </>
            )}
          </FieldArray>
        )}
      />
    </Paper>
  );
}
