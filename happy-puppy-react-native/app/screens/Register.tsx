import { StyleSheet, View } from "react-native";
import RepresentativeImage from "../components/register/RepresentativeImage";
import Nickname from "../components/register/Nickname";
import Age from "../components/register/Age";
import Address from "../components/register/Address";
import Introduce from "../components/register/Introduce";
import Button from "../components/shared/Button";
import { FormProvider, useForm } from "react-hook-form";
import { ON_SUBMIT } from "../constants/shared/form";
import { REGISTER_FROM_DEFAULT_VALUES } from "../constants/register/form";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";

const RegisterPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const form = useForm({
    defaultValues: REGISTER_FROM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit((data) => {
    // 회원가입 완료 시 홈으로 이동
    navigation.navigate("Home");

    console.log("Form Data:", data);
  });

  const disabled = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <View style={styles.imageArea}>
          <RepresentativeImage />
        </View>
        <View style={styles.formArea}>
          <Nickname />
          <Age />
          <Address />
          <Introduce />
        </View>
        <View style={styles.buttonArea}>
          <Button onPress={handleSubmit} disabled={disabled}>
            입장하기
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  imageArea: {
    flex: 0.35,

    justifyContent: "center",
    alignItems: "center",

    gap: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },
  imagePressable: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontWeight: 700,
    fontSize: 16,
  },

  formArea: {
    flex: 0.5,

    justifyContent: "space-around",
    alignItems: "center",
  },

  buttonArea: {
    flex: 0.1,

    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 211,
    height: 55,
    backgroundColor: "#F7DDDE",
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 16,
  },
});
