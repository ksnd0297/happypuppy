import {useEffect, useMemo, useRef, useState} from 'react';
import {KakaoMapService} from '../services/KakaoMapService';
import {KakaoMap, KakaoMapPosition} from '@mapTypes/kakaoMap';
import {debounce} from './util';
import {KakaoMapPlaceInfo, PlaceResponse} from 'src/services/types';
import {MdOutlineRefresh} from 'react-icons/md';
import {BiTargetLock} from 'react-icons/bi';

type Props<T> = {
  centerPosition: KakaoMapPosition;
  placeList?: KakaoMapPlaceInfo<T>[];
  event: string;
  handleResetEvent: () => void;
};

const KakaoMapFrom = <T extends PlaceResponse>({
  centerPosition,
  placeList = [],
  event,
  handleResetEvent,
}: Props<T>) => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const kakaoMapService = useMemo(() => KakaoMapService.getInstance(), []);
  const [kakaoMap, setKakaoMap] = useState<KakaoMap>();

  const [isShowReSearch, setIsShowReSearch] = useState<boolean>(false);
  const [isSearchAround, setIsSearchAround] = useState<boolean>(false);

  const initializeMap = () => {
    if (!kakaoMapRef.current) return;
    kakaoMapService.init({
      targetElement: kakaoMapRef.current,
      centerPosition,
    });

    if (kakaoMapService.map) {
      setKakaoMap(kakaoMapService.map);

      const handleMapPositionChanged = debounce(() => {
        setIsShowReSearch(true);
        setIsSearchAround(false); // 내 주변 버튼 비활성화
      }, 100);
      kakaoMapService.on('mapPositionChanged', handleMapPositionChanged);
      kakaoMapService.on('updateSelectedPlace', (value?: KakaoMapPlaceInfo<T>) => {
        if (!value) return;

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'SELECTED_PLACE',
            data: value.place,
          }),
        );
      });
    }
  };

  // * 초기 지도 셋팅 로직
  useEffect(() => {
    if (!kakaoMapRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          initializeMap();
        }
      }
    });

    observer.observe(kakaoMapRef.current);

    return () => {
      observer.disconnect();
      kakaoMapService?.destroy();
    };
  }, []);

  /**
   * * 가운데 위치 이동 시 카카오맵 위치 연동
   * * 내 위치 찾기 시 해당 로직 발생
   */
  useEffect(() => {
    kakaoMapService.setCenter(centerPosition);
  }, [centerPosition]);

  // * 장소 데이터 마커 최신화
  useEffect(() => {
    if (!kakaoMap || !kakaoMapService) return;

    kakaoMapService.updateMarkers(placeList); //지도 마커 최신화

    kakaoMapService.autoZoomOut(placeList);
  }, [kakaoMap, placeList]);

  const handleSearchAround = () => {
    setIsShowReSearch(false);

    const mapBounds = kakaoMap?.getBounds();

    if (!mapBounds) return;

    // 좍측상단, 우측하단 좌표 배열 변환
    const sw = mapBounds.getSouthWest();
    const ne = mapBounds.getNorthEast();
    const swLat = sw.getLat();
    const swLng = sw.getLng();
    const neLat = ne.getLat();
    const neLng = ne.getLng();

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'LOCATION',
        data: {
          latitude: (neLat + swLat) / 2,
          longitude: (swLng + neLng) / 2,
        },
      }),
    );
  };

  const handleClickGoToMyAround = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'MY_AROUND',
      }),
    );
  };

  // * 모달 닫기 시 UN_PIN 이벤트 발생
  useEffect(() => {
    if (!event) return;

    if (event === 'UN_PIN') {
      kakaoMapService.unpin();
    }

    handleResetEvent();
  }, [event]);

  return (
    <div style={{position: 'relative', width: '100%', height: '100vh'}}>
      <div
        id="util_container"
        style={{
          zIndex: 999,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {isShowReSearch && (
          <button
            style={{
              position: 'absolute',
              left: '50%',
              top: '12px',
              pointerEvents: 'auto',
              borderRadius: '17px',
              padding: '0 12px',
              height: '34px',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              borderColor: 'gray',
              borderWidth: 1,
              transform: 'translateX(-50%)',
            }}
            onClick={handleSearchAround}
          >
            <span
              style={{
                fontSize: '14px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MdOutlineRefresh style={{marginRight: '5px'}} /> 이 지역 재검색
            </span>
          </button>
        )}
        <button
          style={{
            position: 'absolute',
            right: '12px',
            top: '12px',
            pointerEvents: 'auto',
            borderRadius: '50%',
            height: '34px',
            width: '34px',
            backgroundColor: '#fff',
            boxSizing: 'border-box',
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onClick={handleClickGoToMyAround}
        >
          <span
            style={{
              fontSize: '14px',
              lineHeight: '18px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BiTargetLock size={20} color={isSearchAround ? 'blue' : 'black'} />
          </span>
        </button>
      </div>
      <div
        id="map_container"
        style={{zIndex: 1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
      >
        <div id="map" style={{width: '100%', height: '100%'}} ref={kakaoMapRef} />
      </div>
    </div>
  );
};

export default KakaoMapFrom;
