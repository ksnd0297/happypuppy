import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  message: string;
  handleChangeMessage: (text: string) => void;
};

const ChatInput = (props: Props) => {
  const { message, handleChangeMessage } = props;

  return (
    <View style={styles.inputWrapper}>
      <TextInput value={message} style={styles.input} multiline onChangeText={handleChangeMessage} />
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,

    minHeight: 33,
    maxHeight: 100,

    backgroundColor: "#FBE8E7",
    borderRadius: 5,

    flexDirection: "row",

    padding: 5,

    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    padding: 2,
  },
});
