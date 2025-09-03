import { StyleSheet, View } from "react-native";
import Text from "../shared/Text";

type Props = {
  title: string;
  date: string;
};

const ChatTitle = (props: Props) => {
  const { title, date } = props;

  return (
    <View style={styles.chatTitleContainer}>
      <View style={styles.title}>
        <Text large bold>
          {title}
        </Text>
      </View>
      <View>
        <Text small gray>
          {date}
        </Text>
      </View>
    </View>
  );
};

export default ChatTitle;

const styles = StyleSheet.create({
  chatTitleContainer: {
    width: "100%",
  },

  title: {
    paddingBottom: 10,
  },
});
