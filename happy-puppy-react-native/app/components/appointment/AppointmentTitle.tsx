import { fontFamily } from "@/app/constants/shared/font";
import { StyleSheet, TextInput, View } from "react-native";

const AppointmentTitle = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="약속 제목을 입력해주세요 (필수)" placeholderTextColor="#808080" style={styles.textArea} />
    </View>
  );
};

export default AppointmentTitle;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 40,

    borderBottomWidth: 2,

    alignItems: "center",
    justifyContent: "center",
  },

  textArea: {
    fontFamily,
    fontSize: 16,
  },
});
