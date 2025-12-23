import { getPlace } from "@/app/services/place/place";
import { skipToken, useQuery } from "@tanstack/react-query";
import { Coordinate } from "../../screens/DefaultWebviewScreen";

type Props = {
  location?: Coordinate;
};

const useGetPlace = (props: Props) => {
  const { location } = props;

  const { latitude, longitude } = location || {};

  const enabled = !!latitude && !!longitude;

  return useQuery({
    queryKey: [location],
    queryFn: enabled
      ? async () => {
          const response = getPlace({ latitude: latitude.toString(), longitude: longitude.toString(), radius: 1000 });
          return response;
        }
      : skipToken,
    enabled: !!location,
  });
};

export default useGetPlace;
