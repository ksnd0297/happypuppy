import { PlaceInfo } from "@/app/screens/DefaultWebviewScreen";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  selectedPlace: PlaceInfo | undefined;
}

const Modal = forwardRef<BottomSheetModal, Props>(({ selectedPlace }, ref) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["20%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useImperativeHandle(
    ref,
    () => bottomSheetModalRef.current as BottomSheetModal
  );

  useEffect(() => {
    if (selectedPlace) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [selectedPlace]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <Text>{JSON.stringify(selectedPlace)}</Text>
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
