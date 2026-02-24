import { Linking, Pressable, StyleSheet, View } from "react-native";
import HomeImage from "../components/home/HomeImage";
import Text from "../components/shared/Text";
import Divider from "../components/shared/Divider";
import { Calendar } from "react-native-calendars";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../RootStack";
import useUserInfo from "../hooks/auth/useUserInfo";
import useGetUser from "../hooks/useGetUser";
import useMyChat from "../hooks/chat/useMyChat";
import Container from "../components/Container";
import { NOTICE_URL } from "../constants/shared/url";
import { useCallback } from "react";

const HomePage = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList, "Home">>();

  const { userInfo } = useUserInfo();
  const { userId } = userInfo || {};

  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUser({
    id: userId,
    options: {
      enabled: !!userId,
      refetchOnMount: true,
    },
  });

  const { data: myChatList } = useMyChat({
    userId: userId,
  });

  const markedDates = myChatList?.reduce<Record<string, { marked: boolean; dotColor: string }>>((acc, cur) => {
    acc[cur.meetDate] = { marked: true, dotColor: "#FF4141" };
    return acc;
  }, {});

  const handleNavigationInfo = () => {
    if (!userId) return;

    navigate("Register", { id: userId });
  };

  const handleNavigationNotice = () => {
    Linking.openURL(NOTICE_URL);
  };

  const handleNavigationSetting = () => {
    navigate("UsageInfo");
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <Container>
      <View style={styles.imageContainer}>
        {userData && (
          <HomeImage title={userData?.nickname} uri={userData?.profileImageUrl} handlePress={handleNavigationInfo} />
        )}
      </View>
      <View style={styles.homeContainer}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              hideArrows={true}
              style={styles.calendar}
              disableAllTouchEventsForDisabledDays={true}
              markedDates={markedDates}
            />
          </View>
        </View>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.bottomButtonWrapper}>
            <Pressable style={styles.bottomButton} onPress={handleNavigationInfo}>
              <View>
                <Text bold small>
                  내 정보 수정
                </Text>
              </View>
            </Pressable>
            <Divider color="#FCF5EE" />
            <Pressable style={styles.bottomButton} onPress={handleNavigationNotice}>
              <View>
                <Text bold small>
                  공지사항
                </Text>
              </View>
            </Pressable>
            <Divider color="#FCF5EE" />
            <Pressable style={styles.bottomButton} onPress={handleNavigationSetting}>
              <View>
                <Text bold small>
                  이용관리
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Container>
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

    gap: 12,
  },

  homeContainer: {
    flex: 0.65,
  },

  calendarContainer: {
    flex: 0.7,

    alignItems: "center",
    justifyContent: "center",

    paddingTop: 20,
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
    flex: 0.35,
    width: "80%",

    backgroundColor: "#FFEAEE",

    borderRadius: 10,

    flexDirection: "row",
  },
  bottomButton: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});
