import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useController, useFormContext } from "react-hook-form";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";
import ImageResizer from "@bam.tech/react-native-image-resizer";
import Text from "../shared/Text";

const xCircle = require("@/app/assets/icon/x-circle.png");

const cameraImg = require("@/app/assets/camera.png");

const RepresentativeImage = () => {
  const { setError } = useFormContext();

  const {
    field: { value, onChange, disabled },
  } = useController({
    name: REGISTER_FORM_PATH.IMAGE_URL,
  });

  const pickImage = async () => {
    if (disabled) return;

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
        setError(REGISTER_FORM_PATH.IMAGE_URL, {
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
        });
      }
    }
  };

  const imageStyles = {
    ...IMAGE_STYLE["DEFAULT"],
  };

  const hasImage = !!value;

  return (
    <>
      <Pressable onPress={pickImage} style={IMAGE_STYLE["PRESSABLE"]}>
        <View style={imageStyles}>
          <Image source={value ? { uri: value } : cameraImg} style={value ? IMAGE_STYLE.IMAGE : IMAGE_STYLE.PLACEHOLDER} />
        </View>
      </Pressable>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <View style={{ width: 80, alignItems: "center", justifyContent: "center" }}>
          <Text medium>강아지 사진</Text>
        </View>
        {hasImage && (
          <Pressable style={{ width: 20, height: 20, alignItems: "center", justifyContent: "center" }} onPress={() => onChange("")}>
            <Image source={xCircle} style={{ width: 20, height: 20 }} resizeMode="contain" />
          </Pressable>
        )}
      </View>
    </>
  );
};

export default RepresentativeImage;

const IMAGE_STYLE = StyleSheet.create({
  DEFAULT: {
    width: 150,
    height: 150,
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
    width: 50,
    height: 50,
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
