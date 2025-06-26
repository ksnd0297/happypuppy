export {};

declare global {
  interface Window {
    kakao: any;
    receiveLocation(coords: { latitude: number, longitude: number }): void;
  }

  namespace kakao.maps {
    type Map = any;
    type LatLng = any;
    type Marker = any;
    type MapOptions = {
      center: LatLng;
      level?: number;
    };
    type MouseEvent = {
      latLng: LatLng;
    };
  }
}
