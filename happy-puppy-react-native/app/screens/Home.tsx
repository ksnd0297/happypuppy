import { Pressable, StyleSheet, View } from "react-native";
import Footer from "../components/shared/Footer";
import HomeImage from "../components/home/HomeImage";
import Text from "../components/shared/Text";
import Divider from "../components/shared/Divider";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";
import { UserResponse } from "../services/users/types";
import { me } from "@react-native-kakao/user";
import { getUsers, getUsersCheck } from "../services/users/users";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";
import { getMyChat } from "../services/chat/chat";
import { ChatResponse } from "../services/chat/types";

const HomePage = () => {
  const { navigate } = useNavigation<RootStackNavigationProp>();

  const [info, setInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [mySchedule, setMySchedule] = useState<ChatResponse[]>([]);

  const markedDates = mySchedule.reduce<Record<string, { marked: boolean; dotColor: string }>>((acc, cur) => {
    acc[cur.meetDate] = { marked: true, dotColor: "#FF4141" };
    return acc;
  }, {});

  useEffect(() => {
    (async () => {
      const { id } = await me();

      const { userId } = await getUsersCheck({
        appUserId: id,
      });

      const data = await getUsers({
        id: userId,
      });

      setInfo(data);

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!info) return;

    (async () => {
      const { data } = await getMyChat({ userId: info.id });

      setMySchedule(data);
    })();
  }, [info]);

  const handleNavigationInfo = () => {
    if (!info?.id) return;

    navigate("Register", { id: info.id });
  };

  const handleNavigationNotice = () => {};

  const handleNavigationSetting = () => {};

  if (isLoading) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{info && <HomeImage title={info?.nickname} uri={info?.profileImageUrl} handlePress={handleNavigationInfo} />}</View>
      <View style={styles.homeContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar hideArrows={true} style={styles.calendar} disableAllTouchEventsForDisabledDays={true} markedDates={markedDates} />
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
