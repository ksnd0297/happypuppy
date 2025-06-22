import { StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import Footer from "../components/shared/Footer";
import UpComingReservationList from "../components/chatList/UpComingReservationList";

const ChatListPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <UpComingReservationList />
      <View style={styles.chatListContainer}>CHAT LIST</View>
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

  upcomingReservationContainer: {
    flex: 0.2,

    padding: 10,

    gap: 10,

    backgroundColor: "#FCF5EE",
  },
  upcomingReservationList: {
    flexDirection: "row",

    gap: 20,
  },

  chatListContainer: {
    flex: 0.65,
    backgroundColor: "yellow",
  },
});
