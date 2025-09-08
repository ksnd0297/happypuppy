import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ChatTitle from "../components/chat/ChatTitle";
import ChatDescription from "../components/chat/ChatDescription";
import ChatPeople from "../components/chat/ChatPeople";
import ChatButton from "../components/chat/ChatButton";
import ChatCloseButton from "../components/chat/ChatCloseButton";
import ChatImage from "../components/chat/ChatImage";

const dogImage = require("@/app/assets/dog.png");

const SNAP_POINTS = ["55%", "80%"];

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <ChatCloseButton onPress={() => {}} />
      <ChatImage chatImageUrl={dogImage.source} />
      <BottomSheet snapPoints={SNAP_POINTS} animateOnMount={false} backgroundStyle={styles.bottomSheet}>
        <BottomSheetView style={styles.contentContainer}>
          <ChatTitle title="동천역 강아지 산책방" date="동천역 · 25. 05. 17. (토) 18:00" />
          <ChatDescription description={"동천역 앞 탄천에서 저녁에\n소형, 중형견 산책하실 견주 분 구해요 !\n저희 진돗개랑 친구해요 ~"} tags="#산책 #소형견 #중형견 #반려견 #동천 #강아지" />
          <ChatPeople />
        </BottomSheetView>
      </BottomSheet>
      <ChatButton isJoined={true} onPress={() => {}} />
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
