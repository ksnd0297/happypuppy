import React, {useEffect, useMemo, useState} from 'react';
import KakaoMapContainer from '../components/KakaoMapContainer';
import {KakaoMapPlaceInfo} from 'src/services/types';

export type PlaceInfo = {
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
};

const Home = () => {
  // TODO: 네이티브에서 받는 형태로 변경 필요
  const [placeList, setPlaceList] = useState<PlaceInfo[]>([
    {
      lat: 37.5665,
      lng: 126.978,
      title: '서울 시청',
      imageUrl: 'https://picsum.photos/id/237/200/200',
    },
  ]);

  useEffect(() => {
    // 예시: 3초 후 마커 변경
    setTimeout(() => {
      setPlaceList([
        {
          lat: 37.57,
          lng: 126.983,
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

  const kakaoPlaceList = useMemo<KakaoMapPlaceInfo<PlaceInfo>[]>(() => {
    return placeList.map(placeInfo => {
      const {lat, lng, title} = placeInfo;
      return {
        id: `${title}-${lat}-${lng}`,
        latitude: lat,
        longitude: lng,
        place: placeInfo,
      };
    });
  }, [placeList]);

  return (
    <KakaoMapContainer
      center={{latitude: 37.5665, longitude: 126.978}}
      placeList={kakaoPlaceList}
    />
  );
};

export default Home;
