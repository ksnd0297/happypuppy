import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, TextInput, Keyboard } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "../components/modal/Modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useGetPlace from "../hooks/place/useGetPlace";
import { sendLocationToWebView } from "../utils/webview/location";
import { getLocation } from "../utils/device/location";
import { PlaceResponse } from "../services/place/types";
import Container from "../components/Container";
import useLocation from "../hooks/map/useLocation";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface PlaceInfo extends Coordinate {
  id: number;
  name: string;
}

const DefaultWebviewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const inputRef = useRef<TextInput>(null);
  const modalRef = useRef<BottomSheetModal>(null);

  const [selectedPlace, setSelectedPlace] = useState<PlaceResponse>();
  const insets = useSafeAreaInsets(); // 안전 영역 정보 가져오기

  const { location, handleChangeLocation } = useLocation();

  const { data: placeList } = useGetPlace({
    location,
  });

  useEffect(() => {
    if (!placeList) return;

    if (!webViewRef.current) return;

    webViewRef.current.postMessage(
      "" +
        JSON.stringify({
          type: "PLACE",
          data: placeList,
        }),
    );
  }, [placeList]);

  const onMessage = async (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;

    const { type, ...messageProps } = JSON.parse(message);

    switch (type) {
      case "LOCATION": {
        const { latitude, longitude } = messageProps.data;

        if (latitude && longitude) {
          handleChangeLocation({
            latitude,
            longitude,
          });
        }
        return;
      }
      case "MY_AROUND": {
        const location = await getLocation();

        if (location) {
          if (webViewRef.current) {
            sendLocationToWebView({
              webViewRef: webViewRef.current,
              ...location,
            });

            handleChangeLocation(location);
          }
        }
        return;
      }
      case "INIT": {
        console.log("CALL");
        const location = await getLocation();

        console.log("location :", location);

        if (location) {
          if (webViewRef.current) {
            sendLocationToWebView({
              webViewRef: webViewRef.current,
              ...location,
            });

            handleChangeLocation(location);
          }
        }
        return;
      }
      case "SELECTED_PLACE": {
        const { data } = messageProps;

        if (data.id && !!placeList) {
          setSelectedPlace(placeList.find(({ id }) => id === data.id));
          modalRef.current?.present();
        }
        return;
      }
    }
  };

  const handleCloseModal = () => {
    if (!webViewRef.current) return;

    webViewRef.current.postMessage(
      "" +
        JSON.stringify({
          type: "UN_PIN",
        }),
    );

    setSelectedPlace(undefined);
  };

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <>
      <Container>
        <TouchableWithoutFeedback
          disabled={!isKeyboardVisible}
          onPress={() => {
            inputRef.current?.blur();
            Keyboard.dismiss();
          }}
        >
          <SafeAreaView style={styles.container}>
            <WebView
              source={{ uri: "http://10.0.2.2:3000" }}
              style={[styles.webview, { marginTop: insets.top }]}
              ref={webViewRef}
              onMessage={onMessage}
              webviewDebuggingEnabled={true}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Container>
      <Modal ref={modalRef} selectedPlace={selectedPlace} handleCloseModal={handleCloseModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },
  webview: {
    flex: 1, // 웹뷰가 화면을 꽉 채우도록 설정
    backgroundColor: "#FCF5EE",
  },
});

export default DefaultWebviewScreen;
