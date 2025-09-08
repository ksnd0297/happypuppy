import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import Footer from "../components/shared/Footer";
import ChatInfo from "../components/chatList/ChatInfo";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";
import { RouteId } from "../types/route";

const ChatListPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleEnterChat = (roomId: RouteId) => {
    navigation.navigate("Chat", { id: roomId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <View style={styles.chatListContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ChatInfo
            roomId={"1"}
            promiseDateTime="2025. 6. 22. (일) 18:00"
            recentlyMessage="그러면 우리 10시에 모이기로 할까요 ?"
            notReadMessageCount={10}
            memberCount={7}
            roomImage={require("@/app/assets/happypuppy.png")}
            title="동천역 강아지 산책하실 분 모아요!"
            handleEnterChat={handleEnterChat}
          />
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

export default ChatListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  titleContainer: {
    flex: 0.05,

    padding: 10,
  },

  chatListContainer: {
    flex: 0.95,

    padding: 10,

    gap: 10,
  },
});
