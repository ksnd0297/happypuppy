import { Image, Pressable, StyleSheet, View } from "react-native";
import Label from "../shared/Label";
import { useController } from "react-hook-form";
import { APPOINTMENT_FORM_PATH } from "@/app/constants/appointment/form";

import * as ImagePicker from "expo-image-picker";

import ImageResizer from "@bam.tech/react-native-image-resizer";

const cameraImg = require("@/app/assets/camera.png");

const AppointmentImage = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: APPOINTMENT_FORM_PATH.IMAGE_URL,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (result?.assets?.[0]) {
      const response = await ImageResizer.createResizedImage(result.assets[0].uri, 500, 500, "JPEG", 100);

      onChange(response.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <View style={styles.imageArea}>
          <Image source={value ? { uri: value } : cameraImg} style={value ? styles.IMAGE : styles.PLACEHOLDER} />
        </View>
      </Pressable>
      <View style={styles.textArea}>
        <Label label="약속 사진" />
      </View>
    </View>
  );
};

export default AppointmentImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },

  imageArea: {
    width: 200,
    height: 200,
    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },
  IMAGE: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  PLACEHOLDER: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  textArea: {
    height: 28,
  },
});
