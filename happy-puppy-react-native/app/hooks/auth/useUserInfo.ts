import { UserCheckResponse } from "@/app/services/users/types";
import { getUsersCheck } from "@/app/services/users/users";
import { getItem, setItem } from "@/app/utils/storage/storage";
import { isLogined, me } from "@react-native-kakao/user";
import { useEffect, useState } from "react";

export const USER_INFO = "userInfo";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserCheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserInfoStorage = (props: UserCheckResponse) => {
    setUserInfo(props);
    setItem(USER_INFO, props);
  };

  const getUserInfoStorage = async () => {
    return await getItem<UserCheckResponse>(USER_INFO);
  };

  useEffect(() => {
    (async () => {
      try {
        if (await getUserInfoStorage()) return;

        const isLoggedIn = await isLogined();

        if (!isLoggedIn) return;

        const userInfo = await me();

        const { id: appUserId } = userInfo;

        const response = await getUsersCheck({
          appUserId,
        });

        setUserInfo(response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { userInfo, isLoading, setUserInfo: setUserInfoStorage };
};

export default useUserInfo;
