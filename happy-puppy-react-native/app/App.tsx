import Toast from "react-native-toast-message";
import RootStack from "./RootStack";
import Layout from "./Layout";

export default function App() {
  return (
    <Layout>
      <RootStack />
      <Toast position="bottom" />
    </Layout>
  );
}
