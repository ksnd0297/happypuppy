import type {KakaoMap} from './kakaomap';
import type {LatLng} from './latLng';
import type {MarkerImage} from './markerImage';

export class Marker {
  /**
   * 주어진 객체로 마커를 생성한다.
   * 지도 뿐만 아니라 로드뷰 위에도 올릴 수 있다.
   *
   * @param options
   */
  constructor(options: MarkerOptions);

  /**
   * 지도 또는 로드뷰에 마커를 올린다.
   * null 을 지정하면 마커를 제거한다.
   *
   * @param map
   */
  public setMap(map: KakaoMap | null): void;

  /**
   * 마커에 새 MarkerImage를 지정한다.
   *
   * @param image
   */
  public setImage(image: MarkerImage): void;

  /**
   * 마커의 좌표를 지정한다.
   * 로드뷰의 특정 시점에 고정하기 위해서 Viewpoint 객체를 사용할 수도 있다.
   * panoId를 지정한 Viewpoint 를 사용하면 panoId에 해당하는 로드뷰 위치에서만 보이게 된다.
   *
   * @param position
   */
  public setPosition(position: LatLng): void;

  /**
   * 마커의 좌표를 반환한다.
   */
  public getPosition(): LatLng;

  /**
   * 마커의 z-index를 설정한다.
   *
   * @param zIndex
   */
  public setZIndex(zIndex: number): void;
}

export interface MarkerOptions {
  /**
   * 마커가 올라갈 지도 또는 로드뷰
   */
  map?: KakaoMap;

  /**
   * 마커의 좌표 또는 로드뷰에서의 시점
   */
  position: LatLng;

  /**
   * 마커의 이미지
   */
  image?: MarkerImage;

  /**
   * 마커 엘리먼트의 타이틀 속성 값 (툴팁)
   */
  title?: string;

  /**
   * 드래그 가능한 마커, 로드뷰에 올릴 경우에는 유효하지 않다.
   */
  draggable?: boolean;

  /**
   * 클릭 가능한 마커
   */
  clickable?: boolean;

  /**
   * 마커 엘리먼트의 z-index 속성 값
   */
  zIndex?: number;

  /**
   * 마커 투명도 (0-1)
   */
  opacity?: number;

  /**
   * 로드뷰에 올라있는 마커의 높이 값(m 단위)
   */
  altitude?: number;

  /**
   * 로드뷰 상에서 마커의 가시반경(m 단위), 두 지점 사이의 거리가 지정한 값보다 멀어지면 마커는 로드뷰에서 보이지 않게 된다.
   */
  range?: number;
}
