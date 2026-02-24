import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../shared/Text";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
  promiseDateTime: string;
  roomId: number;
  roomImage?: string;
  title: string;
  tags?: string;
  introduce?: string;
  handleEnterChat: (id: number) => void;
};

const defaultImage = require("@/app/assets/default.png");

const ChatInfo = (props: Props) => {
  const { roomId, promiseDateTime, roomImage, title, tags, handleEnterChat, introduce } = props;

  return (
    <Pressable onPress={() => handleEnterChat(roomId)}>
      <View style={styles.chatInfoContainer}>
        <View style={styles.chatInfoImageWrapper}>
          <Image
            source={
              roomImage
                ? {
                    uri: roomImage,
                  }
                : defaultImage
            }
            style={styles.chatInfoImage}
          />
        </View>
        <View style={styles.chatInfoWrapper}>
          <View style={styles.chatInfoTitleWrapper}>
            <Text bold medium>
              {title}
            </Text>
          </View>
          <Text small>{format(promiseDateTime, "yy. MM. dd. (E) HH:MM", { locale: ko })}</Text>
          <Text small numberOfLines={1}>
            {introduce}
          </Text>
          {tags && (
            <Text small gray numberOfLines={1}>
              {tags}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatInfo;

const styles = StyleSheet.create({
  chatInfoContainer: {
    flexDirection: "row",
    height: 80,

    alignItems: "center",

    width: "100%",
  },

  chatInfoImageWrapper: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",

    width: 70,
    height: 70,
  },
  chatInfoImage: {
    width: 70,
    height: 70,

    borderRadius: 50,

    resizeMode: "cover",
  },

  chatInfoWrapper: {
    flex: 0.7,
    gap: 5,
    justifyContent: "center",
  },
  chatInfoTitleWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  notReadMessageCountWrapper: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  notReadMessageCount: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: "#0099FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
