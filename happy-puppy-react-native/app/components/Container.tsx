import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Footer from "./shared/Footer";

type Props = {
  children: React.ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.bodyContainer}>
        {children}
      </KeyboardAvoidingView>
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
