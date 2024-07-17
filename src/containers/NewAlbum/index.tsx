import React from "react";
import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiCheck, FiChevronLeft } from "react-icons/fi";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { useRouter } from "next/router";
import { StepThree } from "./steps/StepThree";
import { Form } from "react-final-form";
import { FormApi } from "final-form";
import ThinChevronRight from "../../assets/icons/thin-chevron-right";
import api from "../../services/api";
import toast from "react-hot-toast";

export type Step = {
  label: string;
  done: boolean;
};

interface FormValues {
  name: string;
  cover: string;
  id?: string;
}

export interface NewAlbumProps {
  album: any;
  step?: string;
  initialSteps?: Step[];
}

export function NewAlbum({ album, step, initialSteps }: NewAlbumProps) {
  const { back, replace } = useRouter();
  const [steps, setSteps] = React.useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = React.useState(step ? +step - 1 : 0);

  function handleNextStep(form: FormApi<FormValues, {}>) {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[currentStep].done = true;
      return newSteps;
    });

    setCurrentStep((prev) => {
      const formValues = form.getState().values;

      replace(
        {
          pathname: "/painel-artista/novo-album",
          query: {
            ...(formValues?.id && { id: formValues?.id }),
            step: prev + 2,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );

      return prev + 1;
    });
  }

  function getStepColor(stepIndex: number) {
    if (stepIndex < currentStep) {
      return "green.200";
    }
    if (stepIndex === currentStep) {
      return "green.200";
    }
    return "gray.500";
  }

  function onStepClick(
    step: Step,
    index: number,
    form: FormApi<FormValues, {}>
  ) {
    if (step.done) {
      setCurrentStep(index);

      const formValues = form.getState().values;

      replace(
        {
          pathname: "/painel-artista/novo-album",
          query: {
            ...(formValues?.id && { id: formValues?.id }),
            step: index + 1,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }

  async function handleSubmit(
    values: FormValues,
    form: FormApi<FormValues, {}>
  ) {
    if (currentStep === 0) {
      try {
        if (!values.id) {
          const result = await api.post("/create-album", values);
          form.change("id", result.data.id);
        } else {
          if (form.getState().modified.name) {
            await api.patch("/create-album/patch-name", {
              albumId: values.id,
              name: values.name,
            });
          }
        }

        handleNextStep(form);
      } catch (error) {
        toast.error("Erro ao criar álbum");
      }
    }

    if (currentStep === 1) {
      if (!values.cover) return;

      if (values.cover.includes("wasabisys.com")) {
        handleNextStep(form);
        return;
      }

      try {
        const base64 = await fetch(values.cover).then((res) => res.blob());

        const cover = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(base64);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });

        const response = await api.patch("/create-album/patch-cover", {
          albumId: values.id,
          image: cover.split(",")[1],
        });

        form.change("cover", response.data.cover);
        handleNextStep(form);
      } catch (error) {
        toast.error("Erro ao atualizar álbum");
      }
    }

    if (currentStep === 2) {
      const confirmPublish = confirm(
        "Você confirma que tudo está correto e deseja fazer a publicação do álbum?"
      );
      if (confirmPublish) {
        try {
          await api.post(`/create-album/publish/${values.id}`, {
            albumId: values.id,
          });

          toast.success(
            "Seu álbum está na fila de processamento, em breve ele será publicado!"
          );
          back();
        } catch (error) {
          toast.error("Erro ao publicar álbum");
        }
      }
    }
  }

  const initialValues = React.useMemo(() => {
    if (album) {
      return {
        id: album.id,
        name: album.name,
        cover: album.cover,
        songs: album.songs,
      };
    }

    return {};
  }, [album]);

  return (
    <Container maxW="container.xl" py={8}>
      <HStack>
        <IconButton
          aria-label="Voltar"
          variant="ghost"
          color="whiteAlpha.900"
          icon={<FiChevronLeft />}
          onClick={back}
        />
        <Heading size="md">Incluir novo álbum</Heading>
      </HStack>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ form }) => (
          <>
            <Box
              borderRadius="md"
              bg="gray.700"
              borderWidth={1}
              borderColor="whiteAlpha.200"
              px={8}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              my={4}
            >
              {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                  <Center
                    gap={4}
                    py={4}
                    flex={1}
                    cursor={step.done ? "pointer" : "auto"}
                    onClick={() => onStepClick(step, index, form)}
                  >
                    <Center
                      w={6}
                      h={6}
                      bg={getStepColor(index)}
                      borderRadius="full"
                    >
                      {step.done && <FiCheck color="#0C2400" size={18} />}
                    </Center>
                    <Text>{step.label}</Text>
                  </Center>

                  {index < steps.length - 1 && <ThinChevronRight />}
                </React.Fragment>
              ))}
            </Box>

            <Center>
              {currentStep == 0 && <StepOne />}
              {currentStep == 1 && <StepTwo />}
              {currentStep == 2 && <StepThree />}
            </Center>
          </>
        )}
      />
    </Container>
  );
}
