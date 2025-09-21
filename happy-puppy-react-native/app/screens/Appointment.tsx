import { Pressable, StyleSheet, View } from "react-native";
import AppointmentImage from "../components/appointment/AppointmentImage";
import Text from "../components/shared/Text";
import AppointmentTitle from "../components/appointment/AppointmentTitle";
import AppointmentTag from "../components/appointment/AppointmentTag";
import AppointmentDate from "../components/appointment/AppointmentDate";
import AppointmentIntroduce from "../components/appointment/AppointmentIntroduce";
import { FormProvider, useForm } from "react-hook-form";
import { APPOINTMENT_FORM_DEFAULT_VALUES } from "../constants/appointment/form";
import { ON_SUBMIT } from "../constants/shared/form";
import { me } from "@react-native-kakao/user";
import RNFS from "react-native-fs";
import awsS3Config from "@/awsS3.config";
import { S3 } from "../utils/aws/s3";
import { postChat } from "../services/chat/chat";
import { Buffer } from "buffer";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../RootStack";

const AppointmentPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const form = useForm({
    defaultValues: APPOINTMENT_FORM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { imageUrl } = data;

    try {
      const { id } = await me();

      const fileData = await RNFS.readFile(imageUrl, "base64");

      const formData = Buffer.from(fileData, "base64");

      const imageName = data.title + "image.jpg";

      const params = {
        Bucket: awsS3Config.bucket,
        Key: imageName,
        Body: formData,
        ContentType: "image/jpeg",
      };

      const image = S3.upload(params);

      const promise = await image.promise();

      const { Location } = promise;

      const {
        data: { chatId },
      } = await postChat({
        imageUrl: Location,
        name: data.title,
        userId: id,
        meetDate: data.date,
        meetTime: data.time,
        placeId: 1,
        introduce: data.introduce,
        tags: [data.tag],
      });

      navigation.navigate("Chat", { id: chatId });
    } catch (error) {
      console.error("error : ", error);
    }
  });

  const disabled = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
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
        <Pressable style={styles.buttonContainer} onPress={handleSubmit} disabled={disabled}>
          <Text medium bold>
            약속 만들기
          </Text>
        </Pressable>
      </View>
    </FormProvider>
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
