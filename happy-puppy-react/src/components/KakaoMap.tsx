import React, {useEffect, useMemo, useRef, useState} from 'react';
import {DEFAULT_MAP_ZOOM_LEVEL, KakaoMapService} from '../services/KakaoMapService';
import {KakaoMap, KakaoMapPosition} from '@mapTypes/kakaoMap';
import {debounce} from './util';
import {KakaoMapPlaceInfo} from 'src/services/types';
import {MdOutlineRefresh} from 'react-icons/md';
import {BiTargetLock} from 'react-icons/bi';

type Props<T> = {
  centerPosition: KakaoMapPosition;
  placeList?: KakaoMapPlaceInfo<T>[];
};

const KakaoMapFrom = <T extends unknown>({centerPosition, placeList = []}: Props<T>) => {
  const kakaoMapRef = useRef<HTMLDivElement>(null);
  const kakaoMapService = useMemo(() => KakaoMapService.getInstance(), []);
  const [kakaoMap, setKakaoMap] = useState<KakaoMap>();

  const [isShowReSearch, setIsShowReSearch] = useState<boolean>(false);
  const [isSearchAround, setIsSearchAround] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<KakaoMapPlaceInfo<T>>();

  const initializeMap = () => {
    if (!kakaoMapRef.current || kakaoMapService.map) return;
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
      kakaoMapService.on('updateSelectedPlace', (place?: KakaoMapPlaceInfo<T>) => {
        setSelectedPlace(place);
      });
    }
  };

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

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => kakaoMapService?.destroy();
  }, []);

  // 중심 좌표 주입 반영
  useEffect(() => {
    if (!kakaoMap) return;
    kakaoMap.setLevel(DEFAULT_MAP_ZOOM_LEVEL);
    kakaoMap.setCenter(
      new window.kakao.maps.LatLng(centerPosition.latitude, centerPosition.longitude),
    );
  }, [centerPosition]);

  useEffect(() => {
    if (!kakaoMap || !kakaoMapService) return;

    setSelectedPlace(undefined); // 선택된 장소 초기화
    kakaoMapService.updateMarkers(placeList); //지도 마커 최신화

    kakaoMapService.autoZoomOut(placeList);
  }, [kakaoMap, placeList]);

  const handleSearchAround = () => {
    // TODO: 네이티브에 현재 지역 재검색 이벤트 보내기
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
    const rect = [swLng, neLat, neLng, swLat];

    console.log(rect);
  };

  const handleClickGoToMyAround = () => {
    //TODO: 네이티브에서 내 위치 조회 후 이동되게 해야함
    setIsSearchAround(true);
  };

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
