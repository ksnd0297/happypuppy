// import { getPlace } from "@/app/services/place/place";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Coordinate } from "../../screens/DefaultWebviewScreen";
import { PlaceResponse } from "@/app/services/place/types";

type Props = {
  location?: Coordinate;
};

const DUMMY_PLACE = [
  {
    id: 1,
    name: "조이 테스트 장소",
    placeType: "PARK",
    address: "다우리빌 402호",
    roadAddress: "용인시 수지구 동천동 877",
    contact: "010-1234-5678",
    homepage: "https://naver.com",
    offDays: "연중무휴",
    operationTime: "오전7시 - 오후10시",
    latitude: "37.394775",
    longitude: "127.1111583",
  },
  {
    id: 2,
    name: "조이 테스트 장소22222",
    placeType: "PARK",
    address: "다우리빌 402호",
    roadAddress: "용인시 수지구 동천동 877",
    contact: "010-1234-5678",
    homepage: "https://naver.com",
    offDays: "연중무휴",
    operationTime: "오전7시 - 오후10시",
    latitude: "37.394775",
    longitude: "127.1121583",
  },
];

const useGetPlace = (props: Props) => {
  const { location } = props;

  const { latitude, longitude } = location || {};

  const enabled = !!latitude && !!longitude;

  return useQuery({
    queryKey: [location],
    queryFn: enabled
      ? async () => {
          // const response = getPlace({ latitude: latitude.toString(), longitude: longitude.toString(), radius: 1000000 });
          // return response;

          return DUMMY_PLACE as PlaceResponse[];
        }
      : skipToken,
    enabled: !!location,
  });
};

export default useGetPlace;
