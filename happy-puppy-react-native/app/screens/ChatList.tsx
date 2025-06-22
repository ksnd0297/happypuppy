import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import UpComingReservation from "../components/chatList/UpComingReservation";
import Icon from "../components/shared/Icon";

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
      <View style={styles.chatListContainer}>CHAT LIST</View>
      <View style={styles.footerContainer}>
        <View style={styles.footerWrapper}>
          <Icon source={require("@/app/assets/icon/bottom-pin.png")}>
            <Text small bold>
              지도
            </Text>
          </Icon>
          <Icon source={require("@/app/assets/icon/bottom-message.png")}>
            <Text small bold>
              채팅
            </Text>
          </Icon>
          <Icon source={require("@/app/assets/icon/bottom-user.png")}>
            <Text small bold>
              마이
            </Text>
          </Icon>
        </View>
      </View>
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

  footerContainer: {
    flex: 0.1,
  },
  footerWrapper: {
    flex: 1,

    backgroundColor: "#FBE8E7",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingLeft: 50,
    paddingRight: 50,
  },
});
