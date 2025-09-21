import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ChatTitle from "../components/chat/ChatTitle";
import ChatDescription from "../components/chat/ChatDescription";
import ChatPeople from "../components/chat/ChatPeople";
import ChatButton from "../components/chat/ChatButton";
import ChatImage from "../components/chat/ChatImage";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { chatJoin, chatLeave } from "../services/chat/chat";
import { RootStackParamList } from "../RootStack";
import useChatDetail from "../hooks/chat/useChatDetail";
import useChatMembers from "../hooks/chat/useChatMembers";
import useUserInfo from "../hooks/auth/useUserInfo";
import CloseButton from "../components/shared/CloseButton";

const SNAP_POINTS = ["55%", "80%"];

const ChatPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "Chat">>();
  const { id: chatId } = params;

  const navigation = useNavigation();

  const { userInfo, isLoading } = useUserInfo();

  const { data: chatInfo } = useChatDetail({
    chatId,
    options: {
      enabled: !!chatId,
    },
  });

  const { data: memberList } = useChatMembers({
    chatId,
    options: {
      enabled: !!chatId,
    },
  });

  const [isJoined, setIsJoined] = useState(false);

  const handleClickChatButton = async () => {
    if (!userInfo?.userId) return;

    const params = {
      userId: userInfo.userId,
      chatId,
    };

    if (isJoined) {
      await chatLeave(params);

      setIsJoined(false);
    } else {
      await chatJoin(params);

      setIsJoined(true);
    }
  };

  useEffect(() => {
    if (!memberList || isLoading) return;

    if (memberList.find((value) => value.userId === userInfo?.userId)) {
      setIsJoined(true);
    }
  }, [memberList, isLoading]);

  return (
    <View style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <ChatImage chatImageUrl={chatInfo?.imageUrl || ""} />
      <BottomSheet snapPoints={SNAP_POINTS} animateOnMount={false} index={0} enableDynamicSizing={false} backgroundStyle={styles.bottomSheet}>
        <BottomSheetView style={styles.contentContainer}>
          <ChatTitle chatInfo={chatInfo} />
          <ChatDescription description={chatInfo?.introduce || ""} tags={chatInfo?.tags || ""} />
          <ChatPeople memberList={memberList} />
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
