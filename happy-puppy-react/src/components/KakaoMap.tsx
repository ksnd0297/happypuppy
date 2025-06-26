import React, { useEffect, useRef, useState } from 'react';
import { KakaoMapService } from '../services/KakaoMapService';

type MarkerData = {
  lat: number;
  lng: number;
  title: string;
  imageUrl?: string;
};

type Props = {
  center: {
    lat: number;
    lng: number;
  };
  markers?: MarkerData[];
};

const KakaoMap = ({ center, markers = [] }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<KakaoMapService | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<MarkerData | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    const service = KakaoMapService.getInstance();
    service.initialize(mapRef.current, center, () => setSelectedInfo(null)); // 지도 클릭 시 선택 해제
    serviceRef.current = service;
  }, [center]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !serviceRef.current) return;

    setSelectedInfo(null); // 마커 업데이트 시 선택 해제
    serviceRef.current.setMarkers(markers, setSelectedInfo);
  }, [markers]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {selectedInfo && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTop: '1px solid #ddd',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
            zIndex: 9999
          }}
        >
          {selectedInfo.imageUrl && (
            <img
              src={selectedInfo.imageUrl}
              alt={selectedInfo.title}
              style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }}
            />
          )}
          <div style={{ fontSize: '16px', fontWeight: 500 }}>{selectedInfo.title}</div>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;