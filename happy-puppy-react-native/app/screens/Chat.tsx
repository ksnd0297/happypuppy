import { Platform, ScrollView, StyleSheet, View } from "react-native";
import ChatHeader from "../components/chat/ChatHeader";
import ChatIcon from "../components/chat/ChatIcon";
import ChatInput from "../components/chat/ChatInput";
import ChatList from "../components/chat/ChatList";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/chat/useSocket";
import { ChatType } from "../chat/chat";

const moreButtonIcon = require("@/app/assets/icon/chevron-right.png");
const sendButtonIcon = require("@/app/assets/icon/send-icon.png");

const ChatPage = () => {
  const userId = useRef(Platform.OS === "android" ? 2 : 1); // Mock user ID for demonstration purposes

  const [chatList, setChatList] = useState<ChatType[]>([]);

  const handleNewMessage = (newMessage: ChatType) => {
    setChatList((prevChatList) => [...prevChatList, newMessage]);
  };

  const { handleSendMessage } = useSocket({
    userId: userId.current,
    handleNewMessage,
  });

  const scrollViewRef = useRef<ScrollView | null>(null);

  const [message, setMessage] = useState<string>("");

  const [initialized, setInitialized] = useState(false);

  const handleChangeMessage = (text: string) => {
    setMessage(text);
  };

  const handleClickSendButton = () => {
    if (message.trim() === "") {
      return;
    }

    handleSendMessage(message);
    handleChangeMessage("");
  };

  useEffect(() => {
    if (initialized) {
      return;
    }

    setInitialized(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 0);
  }, [initialized]);

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <ChatHeader />
      </View>
      <View style={styles.bodyArea}>
        <ScrollView ref={scrollViewRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>
          <ChatList userId={userId.current} chatList={chatList} />
        </ScrollView>
        <View style={styles.footerArea}>
          <ChatIcon source={moreButtonIcon} />
          <View style={styles.inputArea}>
            <ChatInput message={message} handleChangeMessage={handleChangeMessage} />
          </View>
          <ChatIcon source={sendButtonIcon} handleClickIcon={handleClickSendButton} />
        </View>
      </View>
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",

    justifyContent: "space-between",
  },

  headerArea: {
    flex: 0.1,
  },

  bodyArea: {
    flex: 1,
  },

  chatArea: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end",

    padding: 10,

    gap: 20,
  },

  footerArea: {
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",

    padding: 10,

    gap: 5,
  },

  inputArea: {
    flex: 0.95,

    flexDirection: "row",

    gap: 10,

    justifyContent: "center",
  },
});
