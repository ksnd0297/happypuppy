import { REGISTER_FROM_DEFAULT_VALUES } from "@/app/constants/register/form";
import { ON_SUBMIT } from "@/app/constants/shared/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUserInfo from "../auth/useUserInfo";
import useGetUser from "../useGetUser";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { REGISTER_MODE } from "@/app/enums/register";
import RNFS from "react-native-fs";
import { postUsers, putUsers } from "@/app/services/users/users";
import { AgeType, Gender, Region } from "@/app/services/users/types";
import { me } from "@react-native-kakao/user";
import awsS3Config from "@/awsS3.config";
import { S3 } from "@/app/utils/aws/s3";
import { RootStackParamList } from "@/app/RootStack";

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

  const form = useForm({
    defaultValues: REGISTER_FROM_DEFAULT_VALUES,
    mode: ON_SUBMIT,
    reValidateMode: ON_SUBMIT,
    disabled: mode === REGISTER_MODE.VIEW,
  });

  const { data, isFetching, refetch } = useGetUser({
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

    form.reset({ ...data, phone: data?.phoneNumber, age: data?.ageType });
  }, [isFetching, isUserInfoLoading]);

  const handleSubmit = form.handleSubmit(async (data) => {
    let profileImageUrl = data.profileImageUrl;

    // * 닉네임(필수 필드), 대표 이미지가 있고, 변경된 적이 있는 경우에만 S3 업로드 후 값 변경

    const isNeedImageUpload = !!data.nickname && !!profileImageUrl && form.getFieldState("profileImageUrl").isDirty;

    if (isNeedImageUpload) {
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

    if (mode === REGISTER_MODE.EDIT) {
      const { userId } = userInfo || {};

      if (userId) {
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
      }

      navigation.goBack();
    } else if (mode === REGISTER_MODE.REGISTER) {
      const userInfo = await me();

      const { id: appUserId } = userInfo;

      await postUsers({
        nickname: data.nickname,
        appUserId,
        ageType: data.age as AgeType,
        phoneNumber: data.phone,
        address: data.address as Region,
        introduce: data.introduce,
        gender: data.gender as Gender,
        profileImageUrl,
      });

      navigation.navigate("Home");
    }

    refetch();
  });

  return { form, mode, handleSubmit };
};

export default useRegisterForm;
