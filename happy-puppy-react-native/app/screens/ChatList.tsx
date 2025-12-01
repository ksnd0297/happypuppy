import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import ChatInfo from "../components/chatList/ChatInfo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../RootStack";
import useUserInfo from "../hooks/auth/useUserInfo";
import useMyChat from "../hooks/chat/useMyChat";
import Container from "../components/Container";
import { useCallback } from "react";
import { differenceInDays, format } from "date-fns";

const ChatListPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { userInfo } = useUserInfo();

  const { data, refetch, isLoading } = useMyChat({ userId: userInfo?.userId });

  const umComingAppointment = data.filter((value) => differenceInDays(new Date(value.meetAt), new Date()) < 7);

  const handleEnterChat = (roomId: number) => {
    navigation.navigate("Chat", { id: roomId });
  };

  useFocusEffect(
    useCallback(() => {
      if (userInfo?.userId) {
        refetch();
      }
    }, [])
  );

  const chatList = () => {
    if (!data || isLoading) {
      return (
        <View style={{ flex: 1, alignItems: "center", paddingTop: 10, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, alignItems: "center", paddingTop: 10, justifyContent: "center" }}>
          <Text bold>만들어진 약속이 없어요</Text>
          <Text bold>새로은 약속을 만들기 위해 지도로 이동해보세요</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {data?.map((chat, index) => {
          const { id, meetAt, imageUrl, name, tags, introduce } = chat;

          return <ChatInfo key={index} roomId={id} promiseDateTime={meetAt} roomImage={imageUrl} title={name} handleEnterChat={handleEnterChat} tags={tags} introduce={introduce} />;
        })}
      </ScrollView>
    );
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text xlarge bold>
          약속 목록
        </Text>
        <Text large>다가오는 약속</Text>
        <View style={styles.upComingContainer}>
          <ScrollView horizontal contentContainerStyle={{ gap: 15 }}>
            {umComingAppointment.map((value) => (
              <Pressable style={styles.upComingWrapper} key={value.id}>
                <View style={styles.upComingImage} />
                <Text small numberOfLines={1}>
                  {value.name}
                </Text>
                <Text xsmall gray>
                  {format(value.meetAt, "yyyy. MM. dd")}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <Text large>내 약속</Text>
        <View style={styles.myAppointmentContainer}>{chatList()}</View>
      </View>
    </Container>
  );
};

export default ChatListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",

    gap: 20,

    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },

  upComingContainer: {
    width: "100%",
    height: 100,

    flexDirection: "row",
  },
  upComingWrapper: {
    height: 100,
    width: 100,

    gap: 5,

    alignItems: "center",
  },
  upComingImage: {
    width: 55,
    height: 55,
    backgroundColor: "white",
    borderRadius: 50,
  },

  myAppointmentContainer: {
    width: "100%",

    flex: 1,
  },

  titleContainer: {
    flex: 1,
  },

  chatListContainer: {
    flex: 0.95,

    padding: 10,

    gap: 10,
  },
});
