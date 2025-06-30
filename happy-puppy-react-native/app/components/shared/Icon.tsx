import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;
  children?: React.ReactNode;
};

const Icon = (props: Props) => {
  const { source, children } = props;

  return (
    <View style={styles.iconWrapper}>
      <Image source={source} style={styles.icon} />
      {children}
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",

    gap: 5,
  },

  icon: {
    width: 40,
    height: 40,
  },
});
