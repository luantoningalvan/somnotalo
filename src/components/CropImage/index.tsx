import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { CropperStyle } from "./styles";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  ModalContent,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import getCroppedImg from "../../utils/getCroppedImage";

export type ImageState = {
  image: File;
  preview: string;
};

interface EditAvatarProps {
  open: boolean;
  onClose(): void;
  image: ImageState;
  onUpdate(data: any): void;
  aspect?: any;
  shape?: "round" | "rect";
}

type CropInfo = {
  croppedArea: Area;
  croppedAreaPixels: Area;
};

export const CropImageDialog: React.FC<EditAvatarProps> = (props) => {
  const {
    open,
    onClose,
    onUpdate,
    aspect = 1 / 1,
    shape = "round",
    image,
  } = props;

  const [cropState, setCropState] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropInfo, setCropInfo] = useState<CropInfo>({} as CropInfo);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCropInfo({ croppedArea, croppedAreaPixels });
    },
    []
  );

  const handleUpload = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image.preview,
        cropInfo.croppedAreaPixels
      );

      onUpdate(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          <Heading size="md">Cortar imagem</Heading>
        </ModalHeader>

        <ModalBody>
          <CropperStyle>
            <div className="crop-content">
              <Cropper
                image={image.preview}
                crop={crop}
                zoom={zoom}
                aspect={aspect || 1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape={shape}
                minZoom={1}
                maxZoom={4}
                objectFit="auto-cover"
                style={{
                  containerStyle: {
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  },
                }}
              />
            </div>
            <div className="slider">
              <Slider
                value={zoom}
                min={1}
                max={4}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(value: any) => setZoom(value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </div>
          </CropperStyle>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
            <Button onClick={onClose} colorScheme="gray">
              Cancelar
            </Button>
            <Button onClick={handleUpload}>Cortar</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
