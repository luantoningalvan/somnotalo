import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { Field, Form } from "react-final-form";
import { FormApi } from "final-form";
import { toast } from "react-hot-toast";
import { Paper } from "../../../components/Card";
import api from "../../../services/api";

export function EditArtistName({ name }: { name: string }) {
  const handleSubmitNameForm = async (data, form: FormApi) => {
    const result = await api.patch("update-profile/patch-name", {
      name: data.name,
    });

    toast.success("Nome atualizado com sucesso!");

    form.reset({ name: result.data.name });
  };

  return (
    <Form
      onSubmit={handleSubmitNameForm}
      initialValues={{ name }}
      render={({ handleSubmit, submitting }) => (
        <Paper display="flex" flexDirection="column" data-group>
          <Heading size="sm" mb={4}>
            Nome artístico
          </Heading>

          <Field
            name="name"
            render={({ input, meta }) => (
              <>
                <Input placeholder="Seu nome artístico" size="lg" {...input} />
                <Flex
                  justifyContent="flex-end"
                  display={submitting ? "flex" : "none"}
                  _groupFocusWithin={{ display: "flex" }}
                  mt={4}
                >
                  <Button
                    isDisabled={meta.pristine || submitting}
                    onClick={handleSubmit}
                    isLoading={submitting}
                  >
                    Atualizar
                  </Button>
                </Flex>
              </>
            )}
          />
        </Paper>
      )}
    />
  );
}
