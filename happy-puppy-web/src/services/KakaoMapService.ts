import {KakaoMapPlaceInfo, PlaceResponse} from './types';
import {KakaoMapOptions} from '@mapTypes/kakaoMaps';
import {KakaoMap, KakaoMapPosition} from '@mapTypes/kakaoMap';
import type {Marker} from '@mapTypes/marker';
import type {MarkerImage} from '@mapTypes/markerImage';

const GREEN_MARKER_IMAGE = '/emptyGreenPin.svg';
const GREEN_SELECTED_MARKER_IMAGE = '/fullGreenPin.svg';

const YELLOW_MARKER_IMAGE = '/emptyYellowPin.svg';
const YELLOW_SELECTED_MARKER_IMAGE = '/fullYellowPin.svg';

const DEFAULT_MARKER_IMAGE_WIDTH = 24;
const DEFAULT_MARKER_IMAGE_HEIGHT = 35;

const DEFAULT_Z_INDEX = 2;
const SELECTED_Z_INDEX = 5;
const MAP_MIN_ZOOM_LEVEL = 2;
const MAP_MAX_ZOOM_LEVEL = 13;
export const DEFAULT_MAP_ZOOM_LEVEL = 5;

type MarkerImageInfo = {
  url: string;
  size: {
    width: number;
    height: number;
  };
};

enum Place {
  GREEN,
  YELLOW,
}

const MARKER_IMAGES: Record<Place, MarkerImageInfo> = {
  [Place.GREEN]: {
    url: GREEN_MARKER_IMAGE,
    size: {
      width: DEFAULT_MARKER_IMAGE_WIDTH,
      height: DEFAULT_MARKER_IMAGE_HEIGHT,
    },
  },
  [Place.YELLOW]: {
    url: YELLOW_MARKER_IMAGE,
    size: {
      width: DEFAULT_MARKER_IMAGE_WIDTH,
      height: DEFAULT_MARKER_IMAGE_HEIGHT,
    },
  },
};

const SELECTED_MARKER_IMAGES: Record<Place, MarkerImageInfo> = {
  [Place.GREEN]: {
    url: GREEN_SELECTED_MARKER_IMAGE,
    size: {
      width: DEFAULT_MARKER_IMAGE_WIDTH,
      height: DEFAULT_MARKER_IMAGE_HEIGHT,
    },
  },
  [Place.YELLOW]: {
    url: YELLOW_SELECTED_MARKER_IMAGE,
    size: {
      width: DEFAULT_MARKER_IMAGE_WIDTH,
      height: DEFAULT_MARKER_IMAGE_HEIGHT,
    },
  },
};

type KakaoMapServiceProps = {
  targetElement: HTMLElement;
  centerPosition: KakaoMapPosition;
  options?: KakaoMapOptions;
};

// 마커마다 필요 정보 (기본 마커, 선택 마커, 장소 정보, 이벤트 핸들러)
type MarkerPair<T> = {
  defaultMarker: Marker;
  selectedMarker: Marker;
  place: KakaoMapPlaceInfo<T>;
  handler: () => void;
};

export type MapServiceEvents = {
  updateSelectedPlace: (place?: KakaoMapPlaceInfo<any>) => void;
  mapPositionChanged: () => void;
};

export class KakaoMapService {
  private static instance?: KakaoMapService;
  private markerPairList: MarkerPair<any>[] = [];
  private currentSelectedPair?: MarkerPair<any>;
  public map: KakaoMap | null = null;

  // 이벤트+핸들러 관리 맵
  private eventMap: {
    [K in keyof MapServiceEvents]?: MapServiceEvents[K];
  } = {};

  // 편의점별 마커 이미지 캐시 - 재사용을 위해 한 번만 생성
  private markerImages: Map<any, MarkerImage> = new Map();
  private selectedMarkerImages: Map<any, MarkerImage> = new Map();

  // 외부에서 이벤트 핸들러 등록 (단일 핸들러)
  on<K extends keyof MapServiceEvents>(event: K, handler: MapServiceEvents[K]) {
    this.eventMap[event] = handler;
  }

  // 이벤트 발생시 외부에서 등록한 핸들러 호출
  private emit<K extends keyof MapServiceEvents>(
    event: K,
    ...args: Parameters<MapServiceEvents[K]>
  ) {
    const handler = this.eventMap[event];
    //핸들러 등록 전에 이벤트 발생 케이스 예외처리
    if (handler) {
      (handler as (...args: Parameters<MapServiceEvents[K]>) => void)(...args);
    }
  }

  // 편의점 타입에 따른 마커 이미지 반환
  private getMarkerImage = (placeType: Place): MarkerImage => {
    if (!this.markerImages.has(placeType)) {
      const imageInfo = MARKER_IMAGES[placeType];
      const {url, size} = imageInfo;
      const markerImage = new window.kakao.maps.MarkerImage(
        url,
        new window.kakao.maps.Size(size.width, size.height),
      );
      this.markerImages.set(placeType, markerImage);
    }
    return this.markerImages.get(placeType)!;
  };

  private getSelectedMarkerImage = (placeType: Place): MarkerImage => {
    if (!this.selectedMarkerImages.has(placeType)) {
      const imageInfo = SELECTED_MARKER_IMAGES[placeType];
      const {url, size} = imageInfo;
      const markerImage = new window.kakao.maps.MarkerImage(
        SELECTED_MARKER_IMAGES[placeType].url,
        new window.kakao.maps.Size(size.width, size.height),
      );
      this.selectedMarkerImages.set(placeType, markerImage);
    }
    return this.selectedMarkerImages.get(placeType)!;
  };

  private handleMapPositionChanged = () => {
    this.emit('mapPositionChanged');
  };

  private handleMapClick = () => {
    if (this.currentSelectedPair) {
      this.unSelectMarkerPair(this.currentSelectedPair);
      this.emit('updateSelectedPlace', undefined);
    }
  };

  static getInstance() {
    if (!KakaoMapService.instance) {
      KakaoMapService.instance = new KakaoMapService();
    }
    return KakaoMapService.instance;
  }

  init = ({targetElement, centerPosition, options}: KakaoMapServiceProps) => {
    const center = new window.kakao.maps.LatLng(centerPosition.latitude, centerPosition.longitude);
    const kakaoMap = new window.kakao.maps.Map(targetElement, {
      center,
      minLevel: MAP_MIN_ZOOM_LEVEL,
      maxLevel: MAP_MAX_ZOOM_LEVEL,
      level: DEFAULT_MAP_ZOOM_LEVEL,
      draggable: true,
      scrollwheel: true,
      ...options,
    });
    this.map = kakaoMap;
    this.addMapEventListeners();
  };

  private createMarkerPair = (place: KakaoMapPlaceInfo<PlaceResponse>) => {
    const position = new window.kakao.maps.LatLng(place.latitude, place.longitude);

    const chatCount = place.place.chatCount;

    let placeType = Place.GREEN;

    if (chatCount >= 1) {
      placeType = Place.YELLOW;
    }

    // 기본 상태 마커 생성
    const defaultMarker = new window.kakao.maps.Marker({
      position,
      clickable: true,
      image: this.getMarkerImage(placeType),
      zIndex: DEFAULT_Z_INDEX,
    });

    // 선택 상태 마커 생성
    const selectedMarker = new window.kakao.maps.Marker({
      position,
      clickable: true,
      image: this.getSelectedMarkerImage(placeType),
      zIndex: SELECTED_Z_INDEX,
    });

    return {defaultMarker, selectedMarker};
  };

  private selectMarkerPair = (markerPair: MarkerPair<any>) => {
    this.currentSelectedPair = markerPair;
    // 기본 마커 숨기고 선택 마커 보이기
    markerPair.defaultMarker.setMap(null);
    markerPair.selectedMarker.setMap(this.map);
  };

  private unSelectMarkerPair = (markerPair: MarkerPair<any>) => {
    this.currentSelectedPair = undefined;
    // 선택 마커 숨기고 기본 마커 보이기
    markerPair.selectedMarker.setMap(null);
    markerPair.defaultMarker.setMap(this.map);
  };

  private markerClickHandler = (markerPair: MarkerPair<any>) => {
    if (this.currentSelectedPair === markerPair) return;

    if (this.currentSelectedPair) {
      this.unSelectMarkerPair(this.currentSelectedPair);
    }

    this.selectMarkerPair(markerPair);
    const markerPosition = markerPair.defaultMarker.getPosition();
    this.map?.panTo(markerPosition);
    this.emit('updateSelectedPlace', markerPair.place);
  };

  autoZoomOut(placeList: KakaoMapPlaceInfo<any>[]) {
    if (!this.map || placeList.length === 0) return;

    const targetLatLng = new window.kakao.maps.LatLng(
      placeList[0].latitude,
      placeList[0].longitude,
    );

    const mapBounds = this.map.getBounds();
    if (mapBounds.contain(targetLatLng)) return;

    const mapCenter = this.map.getCenter();
    const mapCenterLat = mapCenter.getLat();
    const mapCenterLng = mapCenter.getLng();

    const absLat = Math.abs(placeList[0].latitude - mapCenterLat);
    const absLng = Math.abs(placeList[0].longitude - mapCenterLng);

    const newBounds = new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(mapCenterLat - absLat, mapCenterLng - absLng),
      new window.kakao.maps.LatLng(mapCenterLat + absLat, mapCenterLng + absLng),
    );

    this.map.setBounds(newBounds);
  }

  updateMarkers(placeList: KakaoMapPlaceInfo<any>[]) {
    if (this.currentSelectedPair) {
      // 기존 선택 된 마커 제거
      this.unSelectMarkerPair(this.currentSelectedPair);
    }

    // 기존 마커 리스트 맵에서 제거
    this.resetMarkers();

    // 새로운 장소 리스트 마커 쌍 생성 및 맵에 추가
    placeList.forEach(place => {
      const {defaultMarker, selectedMarker} = this.createMarkerPair(place);

      // 기본 마커만 지도에 표시
      defaultMarker.setMap(this.map);

      // markerPair 객체를 먼저 생성 (handler는 나중에 추가)
      const markerPair = {
        defaultMarker,
        selectedMarker,
        place,
        handler: () => {},
      };
      // handler 함수를 올바르게 설정
      markerPair.handler = () => this.markerClickHandler(markerPair);

      this.markerPairList.push(markerPair);

      // 두 마커 모두에 클릭 이벤트 추가
      window.kakao.maps.event.addListener(defaultMarker, 'click', markerPair.handler);
      window.kakao.maps.event.addListener(selectedMarker, 'click', markerPair.handler);
    });
  }

  setCenter({latitude, longitude}: KakaoMapPosition) {
    const newLatLng = new window.kakao.maps.LatLng(latitude, longitude);

    this.map?.setCenter(newLatLng);
  }

  private addMapEventListeners() {
    window.kakao.maps.event.addListener(this.map, 'center_changed', this.handleMapPositionChanged);
    window.kakao.maps.event.addListener(this.map, 'zoom_changed', this.handleMapPositionChanged);
    window.kakao.maps.event.addListener(this.map, 'click', this.handleMapClick);
  }

  private removeMapEventListeners() {
    if (!this.map || !window.kakao.maps.event) return;

    window.kakao.maps.event.removeListener(
      this.map,
      'center_changed',
      this.handleMapPositionChanged,
    );
    window.kakao.maps.event.removeListener(this.map, 'zoom_changed', this.handleMapPositionChanged);
    window.kakao.maps.event.removeListener(this.map, 'click', this.handleMapClick);
  }

  unpin() {
    this.handleMapClick();
  }

  private resetMarkers() {
    if (!window.kakao.maps.event) return;

    this.markerPairList.forEach(({defaultMarker, selectedMarker, handler}) => {
      window.kakao.maps.event.removeListener(defaultMarker, 'click', handler);
      window.kakao.maps.event.removeListener(selectedMarker, 'click', handler);
      defaultMarker.setMap(null);
      selectedMarker.setMap(null);
    });
    this.markerPairList = [];
  }

  destroy() {
    this.removeMapEventListeners();

    this.resetMarkers();
    this.currentSelectedPair = undefined;
    this.map = null;
    this.eventMap = {};
  }
}
