import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../shared/Text";
import { RouteId } from "@/app/types/route";

type Props = {
  promiseDateTime: string;
  roomId: RouteId;
  roomImage?: string;
  title: string;
  tags?: string;
  handleEnterChat: (id: RouteId) => void;
};

const ChatInfo = (props: Props) => {
  const { roomId, promiseDateTime, roomImage, title, tags, handleEnterChat } = props;

  return (
    <Pressable onPress={() => handleEnterChat(roomId)}>
      <View style={styles.chatInfoContainer}>
        <View style={styles.chatInfoImageWrapper}>
          <Image
            source={{
              uri: roomImage,
            }}
            style={styles.chatInfoImage}
          />
        </View>
        <View style={styles.chatInfoWrapper}>
          <View style={styles.chatInfoTitleWrapper}>
            <Text medium bold>
              {title}
            </Text>
          </View>
          {tags && (
            <Text gray small>
              {tags}
            </Text>
          )}
          <Text gray small>
            {promiseDateTime}
          </Text>
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
  },

  chatInfoImageWrapper: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  chatInfoImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 25,
  },

  chatInfoWrapper: {
    flex: 0.7,
    gap: 2,
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
