import { StyleSheet, View } from "react-native";
import Text from "../shared/Text";

type Props = {
  description?: string;
  tags?: string;
};

const ChatDescription = (props: Props) => {
  const { description, tags } = props;

  return (
    <View style={styles.chatDescriptionContainer}>
      <View style={styles.description}>
        <Text lh24>{description}</Text>
      </View>
      <View style={styles.tags}>
        <Text small gray>
          {tags}
        </Text>
      </View>
    </View>
  );
};

export default ChatDescription;

const styles = StyleSheet.create({
  chatDescriptionContainer: {
    flex: 0.25,

    width: "100%",
    backgroundColor: "#FBE8E7",

    borderRadius: 15,

    paddingLeft: 20,

    paddingBottom: 14,
    paddingTop: 12,
  },

  description: {
    flex: 0.85,
  },
  tags: {
    flex: 0.15,
  },
});
