import { Modal, StyleSheet, View } from "react-native";
import Text from "./shared/Text";

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
};

const Popup = (props: Props) => {
  const { title, content } = props;
  return (
    <Modal backdropColor="#FFFFFF10">
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text large>{title}</Text>
          </View>
          <View style={styles.content}>{content}</View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  wrapper: {
    height: 140,
    width: 300,

    backgroundColor: "#FCF5EE",

    padding: 10,

    borderRadius: 10,
  },

  title: {
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    height: 100,

    alignItems: "center",

    paddingTop: 10,

    paddingBottom: 10,

    gap: 5,
  },
});
