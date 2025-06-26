import React, { useEffect, useState } from 'react';
import KakaoMapContainer from '../components/KakaoMapContainer';

const Home = () => {
  const [markers, setMarkers] = useState([
    {
      lat: 37.5665,
      lng: 126.9780,
      title: '서울 시청',
      imageUrl: 'https://picsum.photos/id/237/200/200',
    },
  ]);

  useEffect(() => {
    // 예시: 3초 후 마커 변경
    setTimeout(() => {
      setMarkers([
        {
      lat: 37.5700,
      lng: 126.9830,
      title: '덕수궁',
      imageUrl: 'https://picsum.photos/id/1025/200/200',
    },
        {
          lat: 37.5651,
          lng: 126.9895,
          title: '을지로입구',
          imageUrl: 'https://picsum.photos/id/1040/200/200',
        },
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
