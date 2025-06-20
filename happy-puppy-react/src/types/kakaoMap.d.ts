// src/global.d.ts

export {};

interface Location {
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    receiveLocation(coords: { latitude: number, longitude: number }): void;
    kakao: {
      maps: any
    }
  }
}
