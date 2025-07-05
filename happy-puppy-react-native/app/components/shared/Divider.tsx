import { ColorValue, View } from "react-native";

const Divider = ({ color }: { color: ColorValue }) => {
  return <View style={{ width: 1, backgroundColor: color }} />;
};

export default Divider;
