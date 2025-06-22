import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import Footer from "../components/shared/Footer";
import UpComingReservationList from "../components/chatList/UpComingReservationList";
import ChatInfo from "../components/chatList/ChatInfo";

const ChatListPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <UpComingReservationList />
      <View style={styles.chatListContainer}>
        <Text xlarge bold>
          채팅
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ChatInfo
            promiseDateTime="2025. 6. 22. (일) 18:00"
            recentlyMessage="그러면 우리 10시에 모이기로 할까요 ?"
            notReadMessageCount={10}
            memberCount={7}
            roomImage={require("@/app/assets/happypuppy.png")}
            title="동천역 강아지 산책하실 분 모아요!"
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
    flex: 0.65,

    padding: 10,

    gap: 10,
  },
});
