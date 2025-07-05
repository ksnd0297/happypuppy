import { StyleSheet, View } from "react-native";
import Footer from "../components/shared/Footer";
import HomeImage from "../components/home/HomeImage";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HomeImage title="행복한 치와와" uri="https://fastly.picsum.photos/id/212/200/300.jpg?hmac=2PUnX8vk476_x3NwjUExdYhPxVyP1Qd17BLvvBYTONQ" />
      </View>
      <View style={styles.homeContainer}>
        <View style={styles.calendarContainer}>캘린더 영역</View>
        <View style={styles.bottomButtonContainer}>바텀 버튼 영역</View>
      </View>
      <Footer />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  footerContainer: {
    flex: 0.1,
  },

  imageContainer: {
    flex: 0.35,

    justifyContent: "center",
    alignItems: "center",

    gap: 8,
  },

  homeContainer: {
    flex: 0.55,
  },

  calendarContainer: {
    flex: 0.7,
    backgroundColor: "blue",
  },
  bottomButtonContainer: {
    flex: 0.3,
    backgroundColor: "green",
  },
});
