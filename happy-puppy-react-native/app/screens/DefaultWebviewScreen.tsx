import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "../components/map/SearchInput";
import Modal from "../components/modal/Modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface Coordinate {
  latitude: number;
  longitude: number;
}
export interface PlaceInfo extends Coordinate {
  id: number;
  title: string;
  imageUrl: string;
}

const DefaultWebviewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const inputRef = useRef<TextInput>(null);
  const modalRef = useRef<BottomSheetModal>(null);

  const [selectedPlace, setSelectedPlace] = useState<PlaceInfo>();
  const [placeList, setPlaceList] = useState<PlaceInfo[]>([]);
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets(); // 안전 영역 정보 가져오기

  // 위치 조회
  const getLocation = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // 빠른 위치 조회 (getLastKnownPositionAsync)
        const fastLocation = await Location.getLastKnownPositionAsync();

        // 빠른 위치가 있으면 먼저 반환
        if (fastLocation) {
          sendLocationToWebView(fastLocation); // 빠른 위치 정보 전달
        }

        // 정확한 위치 조회 (getCurrentPositionAsync)
        const accurateLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // 높은 정확도로 위치 조회
        });
        sendLocationToWebView(accurateLocation); // 정확한 위치 정보 전달
      } else {
        Alert.alert(
          "위치 권한이 필요합니다",
          "위치 정보를 사용하려면 권한을 허용해야 합니다."
        );
      }
    } catch (error) {
      console.error("위치 조회 중 오류 발생:", error);
      Alert.alert("위치 조회 실패", "위치를 가져오는 데 실패했습니다.");
    }
  };

  // WebView에 위치 정보 전달
  const sendLocationToWebView = (location: Location.LocationObject) => {
    if (webViewRef.current) {
      // 위치 정보를 웹뷰로 전달
      console.log(
        "웹뷰에 전달",
        JSON.stringify(location.coords),
        webViewRef.current.postMessage
      );
      webViewRef.current.injectJavaScript(`
        if (window.receiveLocation) {
          window.receiveLocation(${JSON.stringify(location.coords)});
        }
      `);
    }
  };

  const getPlace = () => {
    // TODO: 위치 조회 필요, 현재 더미 데이터
    const placeList: PlaceInfo[] = [
      {
        id: 1,
        latitude: 37.5665,
        longitude: 126.978,
        title: "서울 시청",
        imageUrl: "https://picsum.photos/id/237/200/200",
      },
      {
        id: 2,
        latitude: 37.5665,
        longitude: 126.973,
        title: "서울 시청2",
        imageUrl: "https://picsum.photos/id/237/200/200",
      },
      {
        id: 3,
        latitude: 37.566,
        longitude: 126.973,
        title: "서울 시청2",
        imageUrl: "https://picsum.photos/id/237/200/200",
      },
    ];

    setPlaceList(placeList);

    if (webViewRef.current) {
      // 위치 정보를 웹뷰로 전달

      console.log(
        "웹뷰에 전달",
        JSON.stringify(placeList),
        webViewRef.current.postMessage
      );
      webViewRef.current.injectJavaScript(`
        if (window.receivePlaceList) {
          window.receivePlaceList(${JSON.stringify(placeList)});
        }
      `);
    }
  };

  // 웹뷰에서 메시지를 받았을 때 처리하는 함수
  const onMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    console.log("웹뷰에서 받은 메시지:", message);

    const { type, ...messageProps } = JSON.parse(message);

    switch (type) {
      case "locationRequest":
        getLocation();
        return;
      case "init":
        // TODO: 위치 조회 + 장소 조회 후 전달 필요
        getPlace();
      case "selectPlace":
        const { place } = messageProps;
        //TODO: 테스트용 임시 모달 오픈 로직
        console.log("selectPlace", place, place?.id);
        if (place?.id) {
          setSelectedPlace(placeList.find(({ id }) => id === place.id));
          modalRef.current?.present();
        }
        return;
    }
  };

  const handleSearch = () => {
    inputRef.current?.blur();
    console.log("search query", query);
  };

  const handleChangeQuery = (text: string) => {
    setQuery(text);
  };

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      disabled={!isKeyboardVisible}
      onPress={() => {
        inputRef.current?.blur();
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: "https://happy-puppy-react.vercel.app" }}
          style={[styles.webview, { marginTop: insets.top }]}
          ref={webViewRef}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          originWhitelist={["*"]}
          onMessage={onMessage}
        />
        <SearchInput
          ref={inputRef}
          query={query}
          onChangeQuery={handleChangeQuery}
          onSubmit={handleSearch}
        />
        <Modal ref={modalRef} selectedPlace={selectedPlace} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1, // 웹뷰가 화면을 꽉 채우도록 설정
  },
});

export default DefaultWebviewScreen;
