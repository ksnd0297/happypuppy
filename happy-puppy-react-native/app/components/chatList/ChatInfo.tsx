import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import Text from "../shared/Text";

type Props = {
  memberCount: number;
  notReadMessageCount: number;
  promiseDateTime: string;
  recentlyMessage: string;
  roomImage: ImageSourcePropType;
  title: string;
};

const ChatInfo = (props: Props) => {
  const { memberCount, notReadMessageCount, promiseDateTime, recentlyMessage, roomImage, title } = props;

  return (
    <View style={styles.chatInfoContainer}>
      <View style={styles.chatInfoImageWrapper}>
        <Image source={roomImage} style={styles.chatInfoImage} />
      </View>
      <View style={styles.chatInfoWrapper}>
        <View style={styles.chatInfoTitleWrapper}>
          <Text bold>{title}</Text>
          <Text gray bold>
            {memberCount}
          </Text>
        </View>
        <Text gray small>
          {promiseDateTime}
        </Text>
        <Text small>{recentlyMessage}</Text>
      </View>
      <View style={styles.notReadMessageCountWrapper}>
        <View style={styles.notReadMessageCount}>
          <Text small bold white>
            {notReadMessageCount}
          </Text>
        </View>
      </View>
    </View>
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
    borderRadius: 50,
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
