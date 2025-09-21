import { StyleSheet, View } from "react-native";
import Footer from "./shared/Footer";

type Props = {
  children: React.ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>{children}</View>
      <Footer />
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  bodyContainer: {
    flex: 0.9,
  },
});
