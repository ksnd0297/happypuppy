import useGetChatList from "@/app/hooks/chat/useGetChatList";
import { PlaceResponse } from "@/app/services/place/types";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { forwardRef } from "react";
import { View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native";
import Text from "../shared/Text";
import ChatInfo from "../chatList/ChatInfo";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/app/RootStack";
import { KORPlaceType } from "@/app/services/chat/types";

interface Props {
  selectedPlace?: PlaceResponse;
  handleCloseModal: () => void;
}

const SNAP_POINTS = ["60%"];

const DOWN_INDEX = -1;

const renderBackdrop = (props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />;

const Modal = forwardRef<BottomSheetModal, Props>((props, ref) => {
  const { selectedPlace, handleCloseModal } = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  const { data, refetch, isLoading } = useGetChatList({ placeId: selectedPlace?.id });

  const handleEnterAppointment = (chatId: number) => {
    navigation.navigate("Chat", { id: chatId });
  };

  const handleCreateAppointment = (placeId?: number) => {
    if (!placeId) return;

    navigation.navigate("Appointment", { id: placeId });
  };

  useFocusEffect(() => {
    if (selectedPlace?.id) {
      refetch();
    }
  });

  const productList = () => {
    if (!data || isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (data.length === 0) {
      return (
        <>
          <Text bold>현재 만들어진 악쇽이 없어요</Text>
          <Text bold>처음으로 약속을 만들어 보세요</Text>
        </>
      );
    }

    return (
      <ScrollView style={styles.listContainer} contentContainerStyle={{ gap: 15 }}>
        {data.map((chat, index) => {
          const { id, meetAt, imageUrl, name, introduce, tags } = chat;
          return <ChatInfo key={index} roomId={id} promiseDateTime={meetAt} roomImage={imageUrl} title={name} handleEnterChat={handleEnterAppointment} introduce={introduce} tags={tags} />;
        })}
      </ScrollView>
    );
  };

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={SNAP_POINTS}
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
        backdropComponent={renderBackdrop}
        handleStyle={{ backgroundColor: "#FCF5EE", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        onChange={(index) => {
          if (index === DOWN_INDEX) {
            handleCloseModal();
          }
        }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.title}>
              <Text bold large>
                {selectedPlace?.name}
              </Text>
              <Text bottom small>
                {selectedPlace?.placeType && KORPlaceType[selectedPlace.placeType]}
              </Text>
            </View>
            <View style={styles.address}>
              <Text bold>{selectedPlace?.roadAddress}</Text>
            </View>
          </View>
          <View style={{ flex: 0.7, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{productList()}</View>
          <View style={{ flex: 0.15, width: "100%" }}>
            <Pressable style={styles.buttonContainer} onPress={() => handleCreateAppointment(selectedPlace?.id)}>
              <Text large bold>
                약속 만들기
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",

    alignItems: "center",
    zIndex: 10,

    backgroundColor: "#FCF5EE",
  },

  titleContainer: {
    flex: 0.15,
    width: "100%",

    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,

    gap: 7,
  },
  title: {
    width: "100%",

    flexDirection: "row",

    gap: 10,
  },
  address: {
    width: "100%",
  },

  listContainer: {
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFC4D0",

    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 12,
  },
});

export default Modal;
