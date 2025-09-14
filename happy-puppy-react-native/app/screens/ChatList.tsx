import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import Footer from "../components/shared/Footer";
import ChatInfo from "../components/chatList/ChatInfo";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../App";
import { RouteId } from "../types/route";
import { ChatResponse } from "../services/chat/types";
import { useEffect, useState } from "react";
import { getMyChat } from "../services/chat/chat";
import { me } from "@react-native-kakao/user";
import { getUsersCheck } from "../services/users/users";

const ChatListPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [chatList, setChatList] = useState<ChatResponse[]>([]);

  useEffect(() => {
    (async () => {
      const { id } = await me();

      const {
        data: { userId },
      } = await getUsersCheck({ appUserId: id });

      const { data } = await getMyChat({ userId });

      setChatList(data);
    })();
  }, []);

  const handleEnterChat = (roomId: RouteId) => {
    navigation.navigate("Chat", { id: roomId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text xxxlarge bold>
          약속 목록
        </Text>
      </View>
      <View style={styles.chatListContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            {[{ id: 1, meetAt: "2025-09-14T00:00:00", imageUrl: "abc", name: "abc", tags: ["abc"] }].map((chat, index) => {
              const { id, meetAt, imageUrl, name, tags } = chat;

              return <ChatInfo key={index} roomId={id} promiseDateTime={meetAt} roomImage={imageUrl} title={name} handleEnterChat={handleEnterChat} tags={tags?.[0]} />;
            })}
          </>
        </ScrollView>
      </View>
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

  chatListContainer: {
    flex: 0.95,

    padding: 10,

    gap: 10,
  },
});
