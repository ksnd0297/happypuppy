import { isLogined, me } from "@react-native-kakao/user";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackNavigationProp } from "../App";
import useAuth, { KAKAO_TOKEN_KEY } from "../hooks/auth/useAuth";
import { useEffect } from "react";
import { removeItem } from "../utils/storage/storage";

const happyPuppyImg = require("@/app/assets/happypuppy.png");
const kakaoLoginImg = require("@/app/assets/kakao-login.png");

const LoginPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { token, handleLogin, isLoading } = useAuth();

  const handleKakaoLogin = async () => {
    try {
      const isLoggedIn = await isLogined();

      if (!isLoggedIn) {
        await handleLogin();
      }

      const userInfo = await me();

      const { id } = userInfo;

      // * 회원가입이 되어있는 경우
      if (id === 4290865471) {
        navigation.navigate("Home");
      }
      // * 회원가입이 되어있지 않은 경우
      else {
        navigation.navigate("Register");
      }
    } catch (error) {
      console.error("Kakao login failed:", error);
    }
  };

  useEffect(() => {
    if (isLoading || !token) return;

    const { accessToken, refreshToken, refreshTokenExpiresAt } = token;

    const isRefreshTokenValid = refreshToken && new Date(refreshTokenExpiresAt * 1000).getTime() > new Date().getTime();

    // * Access Token 이 존재하고 Refresh Token 이 만료되지 않은 경우
    if (accessToken && isRefreshTokenValid) {
      (async () => {
        const isLoggedIn = await isLogined();

        if (!isLoggedIn) {
          removeItem(KAKAO_TOKEN_KEY);
          return;
        }

        const userInfo = await me();
        const { id } = userInfo;

        // * 회원가입이 되어있는 경우
        if (id === 4290865471) {
          navigation.navigate("Home");
        }
      })();

      return;
    } else {
      // * Access Token 이 존재하지 않거나 Refresh Token 이 만료된 경우
      removeItem(KAKAO_TOKEN_KEY);
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <Image source={happyPuppyImg} style={styles.image} />
      </View>
      <View style={styles.bottomArea}>
        <View style={styles.captionArea}>
          <Text style={styles.caption}>당신의 반려견의 친구를 만들어주세요</Text>
        </View>
        <View style={styles.buttonArea}>
          <Pressable onPress={handleKakaoLogin}>
            <View style={styles.button}>
              <Image source={kakaoLoginImg} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
    justifyContent: "space-between",
  },

  imageArea: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
  },

  bottomArea: {
    flex: 0.25,

    alignItems: "center",
  },

  captionArea: {
    flex: 0.4,
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    fontSize: 16,
    fontWeight: 700,
  },

  buttonArea: {
    flex: 0.4,
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 183,
    height: 45,
  },
});
