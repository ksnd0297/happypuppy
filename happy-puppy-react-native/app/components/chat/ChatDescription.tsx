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
      <View>
        <Text lh24>{description}</Text>
      </View>
      <View>
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
    flex: 0.15,

    width: "100%",

    borderRadius: 15,

    paddingTop: 12,
  },
});
