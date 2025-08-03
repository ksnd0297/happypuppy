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
import RNFS from "react-native-fs";
import awsS3Config from "@/awsS3.config";
import { S3 } from "../utils/aws/s3";

import { Buffer } from "buffer";
import { postUsers } from "../services/users/users";
import { Gender, Region } from "../services/users/types";

const RegisterPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const form = useForm({
    defaultValues: REGISTER_FROM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { imageUrl } = data;

    try {
      const fileData = await RNFS.readFile(imageUrl, "base64");

      const formData = Buffer.from(fileData, "base64");

      const imageName = data.nickname + "image.jpg";

      const params = {
        Bucket: awsS3Config.bucket,
        Key: imageName,
        Body: formData,
        ContentType: "image/jpeg",
      };

      const image = S3.upload(params);

      const promise = await image.promise();

      const { Location } = promise;

      await postUsers({
        nickname: data.nickname,
        age: +data.age,
        address: data.address as Region,
        introduce: data.introduce,
        gender: Gender.MALE,
        profileImageUrl: Location, // S3에 업로드된 이미지 URL
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("파일 읽는 도중 발생하는 에러 예외처리, error: ", error);
    }
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
