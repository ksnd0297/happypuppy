import { Alert, DimensionValue, Linking, Pressable, StyleSheet, View } from "react-native";
import Container from "../components/Container";
import Text from "../components/shared/Text";
import { logout, unlink } from "@react-native-kakao/user";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStack";
import useWithdraw from "../hooks/auth/useWithdraw";
import useUserInfo from "../hooks/auth/useUserInfo";
import Toast from "react-native-toast-message";

const Divider = ({ width, color }: { width: DimensionValue; color: string }) => {
  return <View style={{ height: 1, width: width, backgroundColor: color }} />;
};

const UsageInfoPage = () => {
  const { reset } = useNavigation<NavigationProp<RootStackParamList, "UsageInfo">>();

  const { mutateAsync } = useWithdraw();
  const { userInfo } = useUserInfo();
  const { userId } = userInfo || {};

  const handleClickRequire = () => {
    Linking.openURL("https://forms.gle/DSwEbZuNh8h55SUS6");
  };

  const handleClickLogout = async () => {
    await logout();

    reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleClickUnlink = async () => {
    Alert.alert("회원탈퇴", "해피퍼피에서의 모든 것이 지워지게 돼요.\n 정말 탈퇴하실건가요?", [
      {
        text: "취소하기",
      },
      {
        text: "탈퇴하기",
        onPress: async () => {
          await unlink();

          if (!userId) throw new Error("회원탈퇴 할 유저ID를 찾을 수 없습니다.");

          try {
            await mutateAsync(userId);

            Toast.show({
              type: "success",
              text1: "회원탈퇴가 완료되었습니다.",
            });

            reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch {
            Toast.show({
              type: "error",
              text1: "회원탈퇴가 실패했습니다. 다시 시도해주세요.",
            });
          }
        },
      },
    ]);
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text xlarge>이용 관리</Text>
        </View>
        <Divider width="100%" color="black" />
        <View style={styles.listContainer}>
          <Pressable style={styles.list} onPress={handleClickRequire}>
            <View style={styles.text}>
              <Text medium>문의하기</Text>
            </View>
            <View style={styles.button}>
              <Text large>{">"}</Text>
            </View>
          </Pressable>
          <Divider width="90%" color="#cccccc" />
          <Pressable style={styles.list} onPress={handleClickLogout}>
            <View style={styles.text}>
              <Text medium>로그아웃</Text>
            </View>
            <View style={styles.button}>
              <Text large>{">"}</Text>
            </View>
          </Pressable>
          <Divider width="90%" color="#cccccc" />
          <Pressable style={styles.list} onPress={handleClickUnlink}>
            <View style={styles.text}>
              <Text medium>회원탈퇴</Text>
            </View>
            <View style={styles.button}>
              <Text large>{">"}</Text>
            </View>
          </Pressable>
          <Divider width="90%" color="#cccccc" />
        </View>
      </View>
    </Container>
  );
};

export default UsageInfoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flex: 0.1,

    alignItems: "center",
    justifyContent: "center",
  },

  listContainer: {
    flex: 0.9,

    alignItems: "center",
  },

  list: {
    flex: 0.1,
    width: "90%",

    justifyContent: "center",

    flexDirection: "row",

    paddingLeft: "5%",
  },
  text: {
    flex: 0.95,

    justifyContent: "center",
  },
  button: {
    flex: 0.05,

    justifyContent: "center",

    alignItems: "center",
  },
});
