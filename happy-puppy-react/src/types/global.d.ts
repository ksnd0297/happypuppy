export {};

import {KakaoMaps} from './kakaoMap/kakaoMaps';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    kakao: {
      maps: KakaoMaps;
    };
    receiveLocation(coords: {latitude: number; longitude: number}): void;
  }
}
