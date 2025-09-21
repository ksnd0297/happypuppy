import { ScrollView, StyleSheet, View } from "react-native";
import Text from "../components/shared/Text";
import Footer from "../components/shared/Footer";
import ChatInfo from "../components/chatList/ChatInfo";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../RootStack";
import useUserInfo from "../hooks/auth/useUserInfo";
import useMyChat from "../hooks/chat/useMyChat";

const ChatListPage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { userInfo } = useUserInfo();

  const { data: chatList } = useMyChat({ userId: userInfo?.userId });

  const handleEnterChat = (roomId: number) => {
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
            {chatList?.map((chat, index) => {
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
    flex: 0.85,

    padding: 10,

    gap: 10,
  },
});
