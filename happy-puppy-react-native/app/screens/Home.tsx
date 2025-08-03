import { Pressable, StyleSheet, View } from "react-native";
import Footer from "../components/shared/Footer";
import HomeImage from "../components/home/HomeImage";
import Text from "../components/shared/Text";
import Divider from "../components/shared/Divider";
import { Calendar } from "react-native-calendars";

const HomePage = () => {
  const handleNavigationInfo = () => {};

  const handleNavigationNotice = () => {};

  const handleNavigationSetting = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <HomeImage title="행복한 치와와" uri="https://happypuppy-bucket.s3.ap-northeast-2.amazonaws.com/dog.png" />
      </View>
      <View style={styles.homeContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              style={styles.calendar}
              onDayPress={(day) => {
                console.log("selected day", day);
              }}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomButtonWrapper}>
            <Pressable style={styles.bottomButton} onPress={handleNavigationInfo}>
              <View>
                <Text bold>내 정보 수정</Text>
              </View>
            </Pressable>
            <Divider color="#FCF5EE" />
            <Pressable style={styles.bottomButton} onPress={handleNavigationNotice}>
              <View>
                <Text bold>공지사항</Text>
              </View>
            </Pressable>
            <Divider color="#FCF5EE" />
            <Pressable style={styles.bottomButton} onPress={handleNavigationSetting}>
              <View>
                <Text bold>이용관리</Text>
              </View>
            </Pressable>
          </View>
        </View>
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

    alignItems: "center",
    justifyContent: "center",
  },
  calendarWrapper: {
    flex: 1,
    width: "80%",
  },
  calendar: {
    borderRadius: 10,
  },

  bottomButtonContainer: {
    flex: 0.3,

    justifyContent: "center",
    alignItems: "center",
  },

  bottomButtonWrapper: {
    flex: 0.4,
    width: "80%",

    backgroundColor: "#F7DDDE",

    borderRadius: 10,

    flexDirection: "row",
  },
  bottomButton: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});
