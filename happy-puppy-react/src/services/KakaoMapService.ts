const DEFAULT_MARKER_IMAGE = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
const SELECTED_MARKER_IMAGE = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

export class KakaoMapService {
  private static instance: KakaoMapService;
  private map!: kakao.maps.Map;
  private marker: kakao.maps.Marker | null = null;
  private markers: kakao.maps.Marker[] = [];
  private selectedMarker: kakao.maps.Marker | null = null;

  private defaultImage = new window.kakao.maps.MarkerImage(
    DEFAULT_MARKER_IMAGE,
    new window.kakao.maps.Size(24, 35)
  );

  private selectedImage = new window.kakao.maps.MarkerImage(
    SELECTED_MARKER_IMAGE,
    new window.kakao.maps.Size(24, 35)
  );

  private constructor() {}

  public static getInstance(): KakaoMapService {
    if (!KakaoMapService.instance) {
      KakaoMapService.instance = new KakaoMapService();
    }
    return KakaoMapService.instance;
  }

  public initialize(container: HTMLElement, center: { lat: number; lng: number }) {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }

    this.map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    });

    // ✅ 지도 클릭 시 선택된 마커 초기화
    window.kakao.maps.event.addListener(this.map, 'click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.setImage(this.defaultImage);
        this.selectedMarker = null;
      }
    });

    // 위치 마커 수신용 (초기 위치 마커 아님)
    window.receiveLocation = ({ latitude, longitude }) => {
      const latLng = new window.kakao.maps.LatLng(latitude, longitude);
      this.map.setCenter(latLng);
      this.marker?.setMap(null);
      this.marker = new window.kakao.maps.Marker({
        position: latLng,
        map: this.map,
        title: '내 위치',
      });
    };
  }

  public setMarkers(markerList: { lat: number; lng: number; title?: string }[]) {
    // 기존 마커 제거
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    markerList.forEach(({ lat, lng, title }) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: this.map,
        title,
        image: this.defaultImage,
      });

      // ✅ 마커 클릭 시 해당 마커만 선택 이미지로 설정
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (this.selectedMarker) {
          this.selectedMarker.setImage(this.defaultImage);
        }
        marker.setImage(this.selectedImage);
        this.selectedMarker = marker;
      });

      this.markers.push(marker);
    });

    // 선택 마커 초기화
    this.selectedMarker = null;
  }

  public getMap(): kakao.maps.Map | undefined {
    return this.map;
  }
}
