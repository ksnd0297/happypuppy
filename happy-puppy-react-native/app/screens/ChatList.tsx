import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import ChatInfo from "../components/chatList/ChatInfo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../RootStack";
import useUserInfo from "../hooks/auth/useUserInfo";
import useMyChat from "../hooks/chat/useMyChat";
import Container from "../components/Container";
import { useCallback } from "react";

const ChatListPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { userInfo } = useUserInfo();

  const { data, refetch, isLoading } = useMyChat({ userId: userInfo?.userId });

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
      return <ActivityIndicator size="large" />;
    }

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, height: "100%", alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
          <Text bold>만들어진 약속이 없어요</Text>
          <Text bold>새로은 약속을 만들기 위해 지도로 이동해보세요</Text>
        </View>
      );
    }

    return (
      <>
        {data?.map((chat, index) => {
          const { id, meetAt, imageUrl, name, tags } = chat;

          return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ChatInfo key={index} roomId={id} promiseDateTime={meetAt} roomImage={imageUrl} title={name} handleEnterChat={handleEnterChat} tags={tags} />
            </ScrollView>
          );
        })}
      </>
    );
  };

  return (
    <Container>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <View style={styles.chatListContainer}>{chatList()}</View>
    </Container>
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
    flex: 0.95,

    padding: 10,

    gap: 10,
  },
});
