import React, {useEffect, useMemo, useState} from 'react';
import KakaoMapContainer from '../components/KakaoMapContainer';
import {KakaoMapPlaceInfo} from 'src/services/types';
import {KakaoMapPosition} from '@mapTypes/kakaoMap';

export type PlaceInfo = {
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
};

const Home = () => {
  // TODO: 네이티브에서 받는 형태로 변경 필요
  const [centerPosition, setCenterPosition] = useState<KakaoMapPosition>({
    latitude: 37.5665,
    longitude: 126.978,
  });
  const [placeList, setPlaceList] = useState<PlaceInfo[]>([
    {
      lat: 37.5665,
      lng: 126.978,
      title: '서울 시청',
      imageUrl: 'https://picsum.photos/id/237/200/200',
    },
  ]);

  const handler = (event: MessageEvent) => {
    console.log(event);
    if (event.data === 'test') {
      window.ReactNativeWebView?.postMessage('test');
    }
    try {
      const {type, data} = JSON.parse(event.data);
      window.ReactNativeWebView?.postMessage('success');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
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

  return <KakaoMapContainer center={centerPosition} placeList={kakaoPlaceList} />;
};

export default Home;
