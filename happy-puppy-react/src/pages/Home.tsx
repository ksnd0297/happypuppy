import { useEffect, useState } from 'react';
import KakaoMapContainer from '../components/KakaoMapContainer';

const Home = () => {
  const [markers, setMarkers] = useState([
    { lat: 37.5665, lng: 126.9780, title: '서울 시청' },
  ]);

  // 3초 후 마커 변경
  useEffect(() => {
    setTimeout(() => {
      setMarkers([
        { lat: 37.5700, lng: 126.9830, title: '덕수궁' },
        { lat: 37.5651, lng: 126.9895, title: '을지로입구' },
      ]);
    }, 3000);
  }, []);

  return (
    <KakaoMapContainer
      center={{ lat: 37.5665, lng: 126.9780 }}
      markers={markers}
    />
  );
};

export default Home;