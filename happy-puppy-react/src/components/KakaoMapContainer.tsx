import {useEffect, useState} from 'react';
import KakaoMap from './KakaoMap';
import {KakaoMapPlaceInfo} from 'src/services/types';
import {KakaoMapPosition} from '@mapTypes/kakaoMap';

type Props<T> = {
  center: KakaoMapPosition;
  placeList: KakaoMapPlaceInfo<T>[];
};

const KakaoMapContainer = <T extends unknown>({center, placeList}: Props<T>) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

    if (!kakaoKey) {
      console.error('❌ Kakao API Key is missing');
      return;
    }

    if (document.getElementById('kakao-script')) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => setLoaded(true));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  return loaded ? (
    <KakaoMap centerPosition={center} placeList={placeList} />
  ) : (
    <div>지도를 불러오는 중입니다...</div>
  );
};

export default KakaoMapContainer;
