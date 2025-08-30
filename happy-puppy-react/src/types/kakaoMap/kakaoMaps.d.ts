import {KakaoMap} from './kakaoMap';
import {Size} from './size';
import {MarkerImage} from './markerImage';
import {LatLng} from './latLng';
import {LatLngBounds} from './latLngBounds';
import {Marker, MarkerOptions} from './marker';

export {};

export interface KakaoMapOptions {
  minLevel?: number;
  maxLevel?: number;
  draggable?: boolean;
  scrollwheel?: boolean;
  center?: LatLng;
  draggable?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
  level?: number;
}

export interface KakaoMaps {
  Map: new (container: Element, options: KakaoMapOptions) => KakaoMap;
  MarkerImage: new (src: string, size: Size) => MarkerImage;
  Size: new (width: number, height: number) => Size;
  LatLng: new (latitude: number, longitude: number) => LatLng;
  LatLngBounds: new (sw: LatLng, ne: LatLng) => LatLngBounds;
  Marker: new (options: MarkerOptions) => Marker;
  event: {
    addListener: (target: any, type: string, handler: () => void) => void;
    removeListener: (target: any, type: string, handler: () => void) => void;
  };
  load: (callback: () => void) => void;
}
