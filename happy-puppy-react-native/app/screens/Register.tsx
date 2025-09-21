import { StyleSheet, View } from "react-native";
import RepresentativeImage from "../components/register/RepresentativeImage";
import Nickname from "../components/register/Nickname";
import Age from "../components/register/Age";
import Address from "../components/register/Address";
import Introduce from "../components/register/Introduce";
import Button, { ButtonType } from "../components/shared/Button";
import { FormProvider, useForm } from "react-hook-form";
import { ON_SUBMIT } from "../constants/shared/form";
import { REGISTER_FROM_DEFAULT_VALUES } from "../constants/register/form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";
import RNFS from "react-native-fs";
import awsS3Config from "@/awsS3.config";
import { S3 } from "../utils/aws/s3";

import { Buffer } from "buffer";
import { getUsers, getUsersCheck, postUsers, putUsers } from "../services/users/users";
import { AgeType, Gender, Region } from "../services/users/types";
import Phone from "../components/register/Phone";
import Sex from "../components/register/Sex";
import { me } from "@react-native-kakao/user";
import { useEffect, useState } from "react";
import useDisclosure from "../hooks/useDisclosure";

import ReportModal from "../components/register/ReportModal";

const RegisterPage = () => {
  const { params } = useRoute();

  const { id } = (params || {}) as { id?: number };

  const navigation = useNavigation<RootStackNavigationProp>();

  const [isMe, setIsMe] = useState(false);

  const { isOpen, handleOpen, handleClose } = useDisclosure();

  // * 회원가입 모드
  const registerMode = id === undefined;

  // * 수정 모드
  const editMode = isMe && !!id;

  // * 뷰어 모드
  const viewMode = !isMe && !!id;

  const form = useForm({
    defaultValues: REGISTER_FROM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
    disabled: viewMode,
  });

  useEffect(() => {
    if (registerMode) return;

    (async () => {
      const data = await getUsers({ id });

      const { id: appUserId } = await me();

      const { userId } = await getUsersCheck({ appUserId });

      if (userId === id) {
        setIsMe(true);
      }

      form.reset({ ...data, phone: data.phoneNumber, age: data.ageType });
    })();
  }, [id]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const { id } = await me();

    let profileImageUrl = data.profileImageUrl;

    // * 닉네임(필수 필드), 대표 이미지가 있고, 변경된 적이 있는 경우에만 S3 업로드 후 값 변경
    if (!!data.nickname && !!profileImageUrl && form.getFieldState("profileImageUrl").isDirty) {
      const fileData = await RNFS.readFile(profileImageUrl, "base64");

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

      profileImageUrl = Location;
    }

    if (editMode) {
      const userInfo = await getUsersCheck({ appUserId: id });
      const { userId } = userInfo || {};

      await putUsers({
        id: userId,
        params: {
          nickname: data.nickname,
          ageType: data.age as AgeType,
          phoneNumber: data.phone,
          address: data.address as Region,
          introduce: data.introduce,
          gender: data.gender as Gender,
          profileImageUrl,
        },
      });

      navigation.goBack();
      return;
    }

    if (registerMode) {
      await postUsers({
        nickname: data.nickname,
        appUserId: id,
        ageType: data.age as AgeType,
        phoneNumber: data.phone,
        address: data.address as Region,
        introduce: data.introduce,
        gender: data.gender as Gender,
        profileImageUrl,
      });

      navigation.navigate("Home");
    }
  });

  const disabled = form.formState.isSubmitting;

  return (
    <>
      <FormProvider {...form}>
        <View style={styles.container}>
          <View style={styles.imageArea}>
            <RepresentativeImage />
          </View>
          <View style={styles.formArea}>
            <Nickname />
            <Phone />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Sex />
              <Age />
            </View>
            <Address />
            <Introduce />
          </View>
          <View style={{ ...styles.buttonArea }}>
            <>
              {viewMode && (
                <>
                  <Button small buttonType={ButtonType.TYPE1} onPress={navigation.goBack} disabled={disabled}>
                    뒤로가기
                  </Button>
                  <Button small buttonType={ButtonType.TYPE2} onPress={handleOpen} disabled={disabled}>
                    신고하기
                  </Button>
                </>
              )}
              {registerMode && (
                <Button buttonType={ButtonType.TYPE1} onPress={handleSubmit} disabled={disabled}>
                  입장하기
                </Button>
              )}
              {editMode && (
                <>
                  <Button small buttonType={ButtonType.TYPE2} onPress={navigation.goBack} disabled={disabled}>
                    뒤로가기
                  </Button>
                  <Button small buttonType={ButtonType.TYPE1} onPress={handleSubmit} disabled={disabled}>
                    수정하기
                  </Button>
                </>
              )}
            </>
          </View>
        </View>
      </FormProvider>
      <ReportModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  imageArea: {
    flex: 0.25,

    justifyContent: "center",
    alignItems: "center",

    gap: 10,
  },

  formArea: {
    flex: 0.65,

    justifyContent: "space-around",
    alignItems: "center",
  },

  buttonArea: {
    flex: 0.1,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    gap: 15,
  },
});
