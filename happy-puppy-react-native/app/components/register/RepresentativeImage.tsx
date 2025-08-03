import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Label from "../shared/Label";
import { useController, useFormContext } from "react-hook-form";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";
import ImageResizer from "@bam.tech/react-native-image-resizer";

const cameraImg = require("@/app/assets/camera.png");

const RepresentativeImage = () => {
  const { setError } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.IMAGE_URL,
    rules: {
      required: "대표 이미지는 필수 입력입니다.",
    },
  });

  const isError = !!error?.message;
  const errorMessage = error?.message;

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
      });

      if (result?.assets?.[0]) {
        const response = await ImageResizer.createResizedImage(result.assets[0].uri, 300, 300, "JPEG", 75);

        onChange(response.uri);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log("error : ", e);
        setError(REGISTER_FORM_PATH.IMAGE_URL, {
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
        });
      }
    }
  };

  const imageStyles = {
    ...IMAGE_STYLE["DEFAULT"],
    ...(isError && IMAGE_STYLE["ERROR"]),
  };

  return (
    <>
      <Pressable onPress={pickImage} style={IMAGE_STYLE["PRESSABLE"]}>
        <View style={imageStyles}>
          <Image source={value ? { uri: value } : cameraImg} style={value ? IMAGE_STYLE.IMAGE : IMAGE_STYLE.PLACEHOLDER} />
        </View>
      </Pressable>
      <Label essential={true} label="대표 이미지" />
      <View>{isError && !!errorMessage && <Text style={{ color: "red", fontSize: 12 }}>{errorMessage}</Text>}</View>
    </>
  );
};

export default RepresentativeImage;

const IMAGE_STYLE = StyleSheet.create({
  DEFAULT: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },

  IMAGE: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  PLACEHOLDER: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  ERROR: {
    borderColor: "red",
  },

  PRESSABLE: {
    justifyContent: "center",
    alignItems: "center",
  },
  TEXT: {
    fontWeight: 700,
    fontSize: 16,
  },
});
