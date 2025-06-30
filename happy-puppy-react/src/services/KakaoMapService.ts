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

  public initialize(
    container: HTMLElement,
    center: { lat: number; lng: number },
    onMapClick?: () => void
  ) {
    if (this.marker) {
      this.marker.setMap(null);
      this.marker = null;
    }

    this.map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 6,
    });

    window.kakao.maps.event.addListener(this.map, 'click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.setImage(this.defaultImage);
        this.selectedMarker = null;
      }
      if (onMapClick) onMapClick();
    });

    window.receiveLocation = ({ latitude, longitude }) => {
      const latLng = new window.kakao.maps.LatLng(latitude, longitude);
      this.map.setCenter(latLng);
    };
  }

  public setMarkers(
    markerList: { lat: number; lng: number; title: string; imageUrl?: string }[],
    onClickMarker?: (data: { lat: number; lng: number; title: string; imageUrl?: string }) => void
  ) {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    markerList.forEach((data) => {
      const { lat, lng, title } = data;

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map: this.map,
        title,
        image: this.defaultImage,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (this.selectedMarker) {
          this.selectedMarker.setImage(this.defaultImage);
        }
        marker.setImage(this.selectedImage);
        this.selectedMarker = marker;

        this.map.panTo(marker.getPosition()); // ✅ 클릭 시 지도 중심 이동

        if (onClickMarker) {
          onClickMarker(data);
        }
      });

      this.markers.push(marker);
    });

    this.selectedMarker = null;
  }

  public getMap(): kakao.maps.Map | undefined {
    return this.map;
  }
}