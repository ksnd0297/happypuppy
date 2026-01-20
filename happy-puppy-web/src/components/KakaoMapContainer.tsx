import {useEffect, useState} from 'react';
import KakaoMap from './KakaoMap';
import {KakaoMapPlaceInfo, PlaceResponse} from 'src/services/types';
import {KakaoMapPosition} from '@mapTypes/kakaoMap';
import Loading from './Loading';

type Props<T> = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  center?: KakaoMapPosition;
  placeList: KakaoMapPlaceInfo<T>[];
  event: string;
  handleResetEvent: () => void;
};

const KakaoMapContainer = <T extends PlaceResponse>({
  center,
  placeList,
  isLoading,
  setIsLoading,
  event,
  handleResetEvent,
}: Props<T>) => {
  useEffect(() => {
    const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

    if (!kakaoKey) {
      console.error('❌ Kakao API Key is missing');
      return;
    }

    if (document.getElementById('kakao-script')) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => setIsLoading(false));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setIsLoading(false));
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'INIT',
      }),
    );
  }, [isLoading]);

  if (isLoading || !center) return <Loading />;

  return (
    <KakaoMap
      centerPosition={center}
      placeList={placeList}
      event={event}
      handleResetEvent={handleResetEvent}
    />
  );
};

export default KakaoMapContainer;
