import { RootStackNavigationProp } from "@/app/App";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const backButtonIcon = require("@/app/assets/icon/chevron-left.png");

const ChatHeader = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleClickBackButton = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerLeftArea}>
        <Pressable style={styles.titleBackButtonArea} onPress={handleClickBackButton}>
          <View>
            <Image source={backButtonIcon} />
          </View>
        </Pressable>
        <View style={styles.titleArea}>
          <Text style={styles.title}>동천역 강아지 산책</Text>
          <Text style={styles.description}>2025. 05. 20. 18:00 · 동천역</Text>
        </View>
      </View>
      <View style={styles.headerRightArea}>
        <Text style={styles.titleRoomPeople}>5</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    width: "100%",
    height: "100%",

    justifyContent: "space-between",
    flexDirection: "row",

    backgroundColor: "#FFC4D0",

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerLeftArea: {
    flex: 0.9,

    flexDirection: "row",

    gap: 10,
  },
  titleBackButtonArea: {
    flex: 0.12,
    justifyContent: "center",
    alignItems: "center",
  },

  titleArea: {
    flex: 0.88,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
  },

  headerRightArea: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleRoomPeople: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
