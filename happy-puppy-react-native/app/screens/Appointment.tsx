import { Pressable, StyleSheet, View } from "react-native";
import AppointmentImage from "../components/appointment/AppointmentImage";
import Text from "../components/shared/Text";
import AppointmentTitle from "../components/appointment/AppointmentTitle";
import AppointmentTag from "../components/appointment/AppointmentTag";
import AppointmentDate from "../components/appointment/AppointmentDate";
import AppointmentIntroduce from "../components/appointment/AppointmentIntroduce";

const AppointmentPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AppointmentImage />
      </View>
      <View style={styles.formContainer}>
        <AppointmentTitle />
        <AppointmentTag />
        <AppointmentDate />
        <AppointmentIntroduce />
      </View>
      <Pressable style={styles.buttonContainer}>
        <Text medium bold>
          약속 만들기
        </Text>
      </Pressable>
    </View>
  );
};

export default AppointmentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  imageContainer: {
    flex: 0.3,

    alignItems: "center",

    paddingTop: 20,
  },

  formContainer: {
    flex: 0.6,

    paddingTop: 20,

    alignItems: "center",

    gap: 30,
  },

  buttonContainer: {
    flex: 0.1,
    backgroundColor: "#FFC4D0",

    alignItems: "center",
    justifyContent: "center",
  },
});
