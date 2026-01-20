import type {Size} from './size';

export class MarkerImage {
  /**
   * 마커에 사용할 이미지를 생성한다.
   * 세 번째 파라메터로 offset을 사용할 경우 네 번째 파라메터로 shape, 다섯 번째 파라메터로 coords를 넣을 수 있다.
   *
   * @param src 이미지 주소
   * @param size 마커의 크기
   * @param options
   */
  constructor(src: string, size: Size);
}
