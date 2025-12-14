import { REGISTER_FROM_DEFAULT_VALUES, RegisterForm } from "@/app/constants/register/form";
import { ON_SUBMIT } from "@/app/constants/shared/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserInfo from "../auth/useUserInfo";
import useGetUser from "../useGetUser";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { REGISTER_MODE } from "@/app/enums/register";
import { postUsers, putUsers } from "@/app/services/users/users";
import { me } from "@react-native-kakao/user";
import { uploadImage } from "@/app/utils/aws/s3";
import { RootStackParamList } from "@/app/RootStack";
import Toast from "react-native-toast-message";

const getMode = ({ id, isMe }: { id?: number; isMe: boolean }) => {
  if (id === undefined) return REGISTER_MODE.REGISTER;
  if (isMe) return REGISTER_MODE.EDIT;
  return REGISTER_MODE.VIEW;
};

const useRegisterForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Register">>();
  const { params } = useRoute<RouteProp<RootStackParamList, "Register">>();

  const { id } = params || {};

  const [isMe, setIsMe] = useState(false);

  const mode = getMode({ id, isMe });

  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();

  const form = useForm<RegisterForm>({
    defaultValues: REGISTER_FROM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
    disabled: mode === REGISTER_MODE.VIEW,
  });

  const { data, isFetching } = useGetUser({
    id,
    options: {
      enabled: !!id,
    },
  });

  useEffect(() => {
    if (isFetching || isUserInfoLoading || mode === REGISTER_MODE.REGISTER) return;

    if (userInfo?.userId === id) {
      setIsMe(true);
    }

    form.reset(data);
  }, [isFetching, isUserInfoLoading]);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (form.formState.isLoading) return;

    const { profileImageUrl, nickname } = data;

    // * 닉네임(필수 필드), 대표 이미지가 있고, 변경된 적이 있는 경우에만 S3 업로드 후 값 변경

    const isNeedImageUpload = !!nickname && !!profileImageUrl && form.getFieldState("profileImageUrl").isDirty;

    const image = isNeedImageUpload ? await uploadImage(profileImageUrl, nickname) : profileImageUrl;

    if (mode === REGISTER_MODE.EDIT) {
      const { userId } = userInfo || {};
      try {
        if (userId) {
          await putUsers({
            id: userId,
            params: {
              nickname: data.nickname ?? "",
              ageType: data.ageType ?? undefined,
              phoneNumber: data.phoneNumber ?? undefined,
              address: data.address ?? undefined,
              introduce: data.introduce ?? undefined,
              gender: data.gender ?? undefined,
              profileImageUrl: image ?? undefined,
            },
          });
        }

        Toast.show({
          text1: "내 정보가 수정됐어요",
        });
        navigation.goBack();
      } catch (error) {
        console.log("회원정보 수정이 실패했습니다.", error);
      }
    } else if (mode === REGISTER_MODE.REGISTER) {
      const userInfo = await me();

      const { id: appUserId } = userInfo;

      try {
        await postUsers({
          appUserId,
          nickname: data.nickname ?? "",
          ageType: data.ageType ?? undefined,
          phoneNumber: data.phoneNumber ?? undefined,
          address: data.address ?? undefined,
          introduce: data.introduce ?? undefined,
          gender: data.gender ?? undefined,
          profileImageUrl: image ?? undefined,
        });

        navigation.navigate("Home");
      } catch (error) {
        console.log("회원가입이 실패했습니다. : ", error);
      }
    }
  });

  return { form, mode, handleSubmit };
};

export default useRegisterForm;
