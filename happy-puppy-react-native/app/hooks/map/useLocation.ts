import { useState } from "react";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const [location, setLocation] = useState<Coordinate>();

  const handleChangeLocation = (coord: Coordinate) => {
    setLocation(coord);
  };

  return { location, handleChangeLocation };
};

export default useLocation;
