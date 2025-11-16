import { Image, Linking, Pressable, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import { NOTICE_URL } from "../constants/shared/url";

const happyPuppyImg = require("@/app/assets/happypuppy.png");

const InspectionPage = () => {
  const handleNavigationNotice = () => {
    Linking.openURL(NOTICE_URL);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={happyPuppyImg} style={styles.image} />
      </View>

      <View style={styles.card}>
        <Text bold medium>
          현재 해피퍼피는 잠깐 수리중이에요
        </Text>
        <Text bold lh24>{`
점검 시작 시간 2025년 11월 11일(화) 10시 10분
점검 종료 시간 2025년 11월 14일(수) 10시 20분`}</Text>
        <View style={{ padding: 5 }} />
        <Pressable onPress={handleNavigationNotice}>
          <Text bold gray>
            공지 보러 가기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InspectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",

    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    flex: 0.3,

    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
  },

  card: {
    flex: 0.2,
    width: "90%",

    backgroundColor: "#FBE8E7",

    padding: 15,

    gap: 5,
  },
});
