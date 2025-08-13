import { getItem, setItem } from "@/app/utils/storage/storage";
import { KakaoLoginToken, login } from "@react-native-kakao/user";
import { useEffect, useState } from "react";

export const KAKAO_TOKEN_KEY = "kakaoToken";

const useAuth = () => {
  const [token, setToken] = useState<KakaoLoginToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    const response = await login();

    setToken(response);

    setItem(KAKAO_TOKEN_KEY, response);
  };

  useEffect(() => {
    async function fetchToken() {
      const response = await getItem<KakaoLoginToken>(KAKAO_TOKEN_KEY);

      if (response) {
        setToken(response);
      }

      setIsLoading(false);
    }

    fetchToken();
  }, []);

  return { token, isLoading, handleLogin };
};

export default useAuth;
