import { useEffect, useState } from 'react';
import KakaoMap from './KakaoMap';

type Props = {
  center: {
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
    title?: string;
  }[];
};

const KakaoMapContainer = ({ center, markers }: Props) => {
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

  return loaded ? <KakaoMap center={center} markers={markers} /> : <div>지도를 불러오는 중입니다...</div>;
};

export default KakaoMapContainer;
