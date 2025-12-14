import { UserCheckResponse } from "@/app/services/users/types";
import { getUsersCheck } from "@/app/services/users/users";
import { isLogined, me } from "@react-native-kakao/user";
import { useEffect, useState } from "react";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserCheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
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

  return { userInfo, isLoading };
};

export default useUserInfo;
