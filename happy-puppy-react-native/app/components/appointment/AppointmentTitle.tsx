import { APPOINTMENT_FORM_PATH } from "@/app/constants/appointment/form";
import { fontFamily } from "@/app/constants/shared/font";
import { useController } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";

const AppointmentTitle = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: APPOINTMENT_FORM_PATH.TITLE,
    rules: {
      required: "약속 제목은 필수 입력입니다.",
      minLength: {
        value: 2,
        message: "약속 제목은 최소 2자 이상이어야 합니다.",
      },
      maxLength: {
        value: 15,
        message: "약속 제목은 최대 15자 이하여야 합니다.",
      },
    },
  });

  return (
    <View style={styles.container}>
      <TextInput value={value} onChangeText={onChange} placeholder="약속 제목을 입력해주세요 (필수)" placeholderTextColor="#808080" style={styles.textArea} maxLength={15} />
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
