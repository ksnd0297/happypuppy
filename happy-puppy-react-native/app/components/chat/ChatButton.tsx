import { Pressable, StyleSheet } from "react-native";
import Text from "../shared/Text";

type Props = {
  isJoined: boolean;
  onPress: () => void;
};

const ChatButton = (props: Props) => {
  const { isJoined, onPress } = props;

  return (
    <Pressable style={{ ...styles.buttonContainer, ...(isJoined ? styles.exitButton : styles.joinButton) }} onPress={onPress}>
      <Text medium>{isJoined ? "약속 나가기" : "약속 참여하기"}</Text>
    </Pressable>
  );
};

export default ChatButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
  },

  joinButton: {
    backgroundColor: "#FFC4D0",
  },

  exitButton: {
    backgroundColor: "#FF4141",
  },
});
