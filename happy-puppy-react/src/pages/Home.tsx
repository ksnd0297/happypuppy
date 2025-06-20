import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const kakaoKey = process.env.REACT_APP_KAKAO_JS_KEY;

    if (!kakaoKey) {
      console.error('❌ Kakao API Key is missing');
      return;
    }

    // 스크립트가 이미 삽입돼 있다면 중복 방지
    if (document.getElementById('kakao-script')) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(initializeMap);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'kakao-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };
    document.head.appendChild(script);

    function initializeMap() {
      // TODO: 마커는 추후 내 위치 마커로 변경 예정 
      let marker: { setMap: (arg0: null) => void; } | null = null;
      const container = document.getElementById('map') as HTMLElement;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(37.5665, 126.9780),
      });

      // 위치를 받는 함수
      window.receiveLocation = function(coords: { latitude: number, longitude: number }) {
        const moveLatLon = new window.kakao.maps.LatLng(coords.latitude, coords.longitude);
        map.setCenter(moveLatLon); // 지도 이동
        marker?.setMap(null);
        marker = new window.kakao.maps.Marker({
            map: map,
            position: moveLatLon,
        });

      };
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}

export default Home;