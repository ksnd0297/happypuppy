import { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

type Props = BottomSheetBackdropProps;

const Backdrop = (props: Props) => {
  return <BottomSheetBackdrop {...props} style={styles.backdropStyle} appearsOnIndex={0} disappearsOnIndex={-1} />;
};

export default Backdrop;

const styles = StyleSheet.create({
  backdropStyle: {
    backgroundColor: "#C8C8C8",
    opacity: 0.6,
  },
});
