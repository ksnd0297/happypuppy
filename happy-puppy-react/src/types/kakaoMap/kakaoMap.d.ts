export {};

import {LatLng} from './latLng';
import {LatLngBounds} from './latLngBounds';

export interface KakaoMap {
  setCenter: (center: LatLng) => void;
  setLevel: (level: number) => void;
  getCenter: () => LatLng;
  panTo: (position: LatLng) => void;
  getBounds: () => LatLngBounds;
  setBounds: (bounds: LatLngBounds, padding?: number) => void;
  getLevel: () => number;
}

export interface KakaoMapPosition {
  latitude: number;
  longitude: number;
}
