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
import { uploadImage } from "../utils/aws/s3";
import { postChat } from "../services/chat/chat";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackNavigationProp, RootStackParamList } from "../RootStack";
import CloseButton from "../components/shared/CloseButton";
import { getUsersCheck } from "../services/users/users";
import { isAfter } from "date-fns";
import Toast from "react-native-toast-message";

const AppointmentPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { params } = useRoute<RouteProp<RootStackParamList, "Appointment">>();
  const { id: placeId } = params;

  const form = useForm({
    defaultValues: APPOINTMENT_FORM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const { imageUrl } = data;
    const appointmentDate = new Date(`${data.date}T${data.time}`);

    if (isAfter(new Date(), appointmentDate)) {
      Toast.show({
        type: "error",
        text1: "과거 시간으로 약속을 생성할 수 없습니다.",
      });
      return;
    }

    try {
      const { id } = await me();

      const { userId } = await getUsersCheck({ appUserId: id });

      if (!userId) throw new Error("유저 정보를 불러오지 못했습니다.");

      const image = imageUrl ? await uploadImage(imageUrl, data.title) : imageUrl;

      const { chatId } = await postChat({
        imageUrl: image,
        name: data.title,
        userId,
        meetDate: data.date,
        meetTime: data.time,
        placeId,
        introduce: data.introduce,
        tags: data.tag,
      });

      navigation.replace("Chat", { id: chatId });
    } catch (error) {
      console.error("약속 생성에 실패했습니다. : ", error);
    }
  });

  const disabled = form.formState.isSubmitting;

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <CloseButton onPress={() => navigation.goBack()} />
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
    flex: 0.2,

    alignItems: "center",

    paddingTop: 20,
  },

  formContainer: {
    flex: 0.7,

    paddingTop: 50,

    alignItems: "center",

    gap: 50,
  },

  buttonContainer: {
    flex: 0.1,
    backgroundColor: "#FFC4D0",

    alignItems: "center",

    paddingTop: 25,
  },
});
