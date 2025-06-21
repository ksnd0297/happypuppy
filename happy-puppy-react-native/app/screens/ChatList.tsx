import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import UpComingReservation from "../components/chatList/UpComingReservation";

const ChatListPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <View style={styles.upcomingReservationContainer}>
        <Text xlarge bold>
          다가오는 약속
        </Text>
        <ScrollView horizontal contentContainerStyle={styles.upcomingReservationList} showsHorizontalScrollIndicator={false}>
          <UpComingReservation imageUri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" title="동천역 강아지 산책" dateTime="2025. 6. 22. (일) 18:00" />
          <UpComingReservation imageUri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" title="동천역 강아지 산책" dateTime="2025. 6. 22. (일) 18:00" />
          <UpComingReservation imageUri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" title="동천역 강아지 산책" dateTime="2025. 6. 22. (일) 18:00" />
          <UpComingReservation imageUri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" title="동천역 강아지 산책" dateTime="2025. 6. 22. (일) 18:00" />
          <UpComingReservation imageUri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" title="동천역 강아지 산책" dateTime="2025. 6. 22. (일) 18:00" />
        </ScrollView>
      </View>
      <View>CHAT LIST</View>
      <View>FOOTER</View>
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

  chatListContainer: {},

  footerContainer: {},
});
