import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const Modal = forwardRef<BottomSheetModal>((_, ref) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["20%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useImperativeHandle(ref, () => bottomSheetModalRef.current as BottomSheetModal);

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints} enableDynamicSizing={false} onChange={handleSheetChanges} backdropComponent={renderBackdrop}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    zIndex: 10,
  },
});

export default Modal;
