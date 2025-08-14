import { Image, Pressable, StyleSheet, View } from "react-native";
import Label from "../shared/Label";

const cameraImg = require("@/app/assets/camera.png");

const AppointmentImage = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <View style={styles.imageArea}>
          <Image source={cameraImg} />
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

  textArea: {
    height: 28,
  },
});
