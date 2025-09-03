import { Image, Pressable, StyleSheet } from "react-native";

const closeImage = require("@/app/assets/icon/close.png");

type Props = {
  onPress: () => void;
};

const ChatCloseButton = (props: Props) => {
  const { onPress } = props;

  return (
    <Pressable style={styles.closeButtonContainer} onPress={onPress}>
      <Image source={closeImage} style={styles.closeButton} />
    </Pressable>
  );
};

export default ChatCloseButton;

const styles = StyleSheet.create({
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    left: 12,
    zIndex: 1,
  },

  closeButton: {
    width: 24,
    height: 24,
  },
});
