import { fontFamily } from "@/src/constants/shared/font";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type Props = {
  avatarImage: string;
  isMine?: boolean;
  isSameSender?: boolean;
  text: string;
};

const Chat = (props: Props) => {
  const { avatarImage, isMine, isSameSender, text } = props;

  return (
    <View style={styles.chatWrapper}>
      {isMine || isSameSender ? <></> : <Image source={{ uri: avatarImage }} style={styles.avatar} />}
      <View style={{ ...styles.textWrapper, alignSelf: isMine ? "flex-end" : "flex-start" }}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },

  chatWrapper: {
    gap: 10,
    marginBottom: 8,
  },

  textWrapper: {
    backgroundColor: "#FBE8E7",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: "70%",
  },

  text: {
    fontFamily,
  },
});
