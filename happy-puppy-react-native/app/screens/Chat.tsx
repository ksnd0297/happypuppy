import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ChatTitle from "../components/chat/ChatTitle";
import ChatDescription from "../components/chat/ChatDescription";
import ChatPeople from "../components/chat/ChatPeople";
import ChatButton from "../components/chat/ChatButton";
import ChatCloseButton from "../components/chat/ChatCloseButton";
import ChatImage from "../components/chat/ChatImage";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { chatJoin, chatLeave, getChatMembers, getMyChat } from "../services/chat/chat";
import { me } from "@react-native-kakao/user";
import { getUsers, getUsersCheck } from "../services/users/users";
import { ChatResponse } from "../services/chat/types";

const SNAP_POINTS = ["55%", "80%"];

const ChatPage = () => {
  const route = useRoute();
  const { id: chatId } = route.params as { id: number };

  const [chatInfo, setChatInfo] = useState<ChatResponse>();
  const [isJoined, setIsJoined] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!chatId) return;

    (async () => {
      const { id: appUserId } = await me();

      const {
        data: { userId },
      } = await getUsersCheck({ appUserId });

      // TODO : 방 상세 조회 API 로 변경
      const { data: myChatList } = await getMyChat({ userId });

      // TODO : 500 에러 해결 필요
      const { data: chatMembers } = await getChatMembers({ chatId });

      setIsJoined(chatMembers.some((member) => member.userId === userId));

      setChatInfo(myChatList[0]);
    })();
  }, [chatId]);

  const handleClickChatButton = async () => {
    const { id: appUserId } = await me();

    const {
      data: { userId },
    } = await getUsersCheck({ appUserId });

    const {
      data: { id },
    } = await getUsers({
      id: userId,
    });

    if (isJoined) {
      await chatLeave({
        userId: id,
        chatId,
      });

      setIsJoined(false);
    } else {
      await chatJoin({
        userId: id,
        chatId,
      });

      setIsJoined(false);
    }
  };

  return (
    <View style={styles.container}>
      <ChatCloseButton onPress={() => navigation.goBack()} />
      <ChatImage chatImageUrl={chatInfo?.imageUrl || ""} />
      <BottomSheet snapPoints={SNAP_POINTS} animateOnMount={false} index={0} enableDynamicSizing={false} backgroundStyle={styles.bottomSheet}>
        <BottomSheetView style={styles.contentContainer}>
          <ChatTitle title={chatInfo?.name || ""} date="동천역 · 25. 05. 17. (토) 18:00" />
          <ChatDescription description={chatInfo?.introduce || ""} tags={chatInfo?.tags?.[0] || ""} />
          <ChatPeople />
        </BottomSheetView>
      </BottomSheet>
      <ChatButton isJoined={isJoined} onPress={handleClickChatButton} />
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    backgroundColor: "FCF5EE",
  },

  bottomSheet: {
    backgroundColor: "#FCF5EE",
  },

  contentContainer: {
    flex: 1,
    paddingTop: 36,

    paddingLeft: 20,
    paddingRight: 20,

    height: 700,

    gap: 14,

    alignItems: "center",
  },
});
