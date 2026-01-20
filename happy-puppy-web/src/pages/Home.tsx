import React, {useEffect, useMemo, useState} from 'react';
import KakaoMapContainer from '../components/KakaoMapContainer';
import {KakaoMapPlaceInfo, PlaceResponse} from 'src/services/types';
import {KakaoMapPosition} from '@mapTypes/kakaoMap';
import {RequireKeys} from 'src/types/base';
import {toast, ToastContainer} from 'react-toastify';

export type PlaceInfo = {
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // TODO: 네이티브에서 받는 형태로 변경 필요
  const [centerPosition, setCenterPosition] = useState<KakaoMapPosition>();
  const [placeList, setPlaceList] = useState<PlaceResponse[]>([]);

  const [event, setEvent] = useState<string>('');

  const handleResetEvent = () => {
    setEvent('');
  };

  const handler = (event: MessageEvent) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify(event));

    try {
      const {type, data} = JSON.parse(event.data);

      if (type === 'PLACE') {
        setPlaceList(data);
      }

      if (type === 'POSITION') {
        const {latitude, longitude} = data;

        setCenterPosition({
          latitude: +latitude,
          longitude: +longitude,
        });
      }

      if (type === 'UN_PIN') {
        setEvent('UN_PIN');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handler);
    document.addEventListener('message', handler as EventListener);
    return () => {
      window.removeEventListener('message', handler);
      document.removeEventListener('message', handler as EventListener);
    };
  }, []);

  const kakaoPlaceList = useMemo<KakaoMapPlaceInfo<PlaceResponse>[]>(() => {
    return placeList
      .filter(
        (value): value is RequireKeys<PlaceResponse, 'latitude' | 'longitude' | 'name'> =>
          !!value.latitude && !!value.longitude && !!value.name,
      )
      .map(placeInfo => {
        const {latitude, longitude, name} = placeInfo;

        return {
          id: `${name}-${latitude}-${longitude}`,
          latitude: +latitude,
          longitude: +longitude,
          place: placeInfo as PlaceResponse,
        };
      });
  }, [placeList]);

  return (
    <>
      <KakaoMapContainer
        center={centerPosition}
        placeList={kakaoPlaceList}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        event={event}
        handleResetEvent={handleResetEvent}
      />
      <ToastContainer />
    </>
  );
};

export default Home;
