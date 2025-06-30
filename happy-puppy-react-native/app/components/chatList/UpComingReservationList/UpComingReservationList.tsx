import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../../shared/Text";
import UpComingReservation from "./UpComingReservation";

const UpComingReservationList = () => {
  return (
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
  );
};

export default UpComingReservationList;

const styles = StyleSheet.create({
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
});
