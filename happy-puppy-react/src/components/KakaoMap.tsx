import React, { useEffect, useRef } from 'react';
import { KakaoMapService } from '../services/KakaoMapService';

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

const KakaoMap = ({ center, markers = [] }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<KakaoMapService | null>(null);

  // 최초 지도 초기화
  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    const service = KakaoMapService.getInstance();
    service.initialize(mapRef.current, center);
    serviceRef.current = service;
  }, [center]);

  // 마커가 변경될 때마다 갱신
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !serviceRef.current) return;
    serviceRef.current.setMarkers(markers);
  }, [markers]);

  return <div id="map" ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default KakaoMap;
