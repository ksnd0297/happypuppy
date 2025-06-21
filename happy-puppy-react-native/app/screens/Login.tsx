import { isLogined, login, me } from "@react-native-kakao/user";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const happyPuppyImg = require("@/app/assets/happypuppy.png");
const kakaoLoginImg = require("@/app/assets/kakao-login.png");

const LoginPage = () => {
  const handleKakaoLogin = async () => {
    try {
      const isLoggedIn = await isLogined();
      console.log("isLoggedIn : ", isLoggedIn);

      if (!isLoggedIn) {
        await login();
      }

      const userInfo = await me();
      console.log("userInfo : ", userInfo);

      // TODO : 유저 정보 API 조회 후 홈 또는 회원가입 화면 이동
    } catch (error) {
      console.error("Kakao login failed:", error);
    }
  };

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
