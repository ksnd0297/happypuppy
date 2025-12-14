import { isLogined, login, me } from "@react-native-kakao/user";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { getUsersCheck } from "../services/users/users";
import { RootStackNavigationProp } from "../RootStack";
import useCheckMember from "../hooks/auth/useCheckMember";
import { CheckMemberStatus } from "../services/users/types";

const happyPuppyImg = require("@/app/assets/happypuppy.png");
const kakaoLoginImg = require("@/app/assets/kakao-login.png");

const LoginPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { mutateAsync } = useCheckMember();

  const handleKakaoLogin = async () => {
    try {
      const isLoggedIn = await isLogined();

      if (!isLoggedIn) {
        await login();
      }

      const { id: appUserId } = await me();

      const response = await mutateAsync({
        appUserId,
      });

      const { status } = response;

      // * 회원가입이 되어있는 경우
      if (status === CheckMemberStatus.JOIN) {
        navigation.navigate("Home");
      }
      // * 회원가입이 되어있지 않은 경우
      else if (status === CheckMemberStatus.UNREGISTERED || status === CheckMemberStatus.WITHDRAW) {
        navigation.navigate("Register");
      }
    } catch {
      await login();
    }
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await isLogined();

      if (!isLoggedIn) return;

      const { id: appUserId } = await me();

      const response = await getUsersCheck({
        appUserId,
      });

      const { status } = response;

      if (status === CheckMemberStatus.JOIN) {
        navigation.navigate("Home");
      }
    })();
  }, []);

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
