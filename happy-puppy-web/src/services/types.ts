export type KakaoMapPlaceInfo<T> = {
  id: string;
  latitude: number;
  longitude: number;
  place: T;
};

enum PlaceType {
  PARK = 'PARK',
  HOSPITAL = 'HOSPITAL',
  PHARMACY = 'PHARMACY',
  CULTURE_CENTER = 'CULTURE_CENTER',
  ART_MUSEUM = 'ART_MUSEUM',
  BEAUTY = 'BEAUTY',
  MUSEUM = 'MUSEUM',
  SUPPLIES = 'SUPPLIES',
  RESTAURANT = 'RESTAURANT',
  TRAVEL = 'TRAVEL',
  ENTRUST_MANAGEMENT = 'ENTRUST_MANAGEMENT',
  CAFE = 'CAFE',
}

export type PlaceResponse = {
  id: number;
  name?: string;
  placeType?: PlaceType;
  address?: string;
  roadAddress?: string;
  latitude?: string;
  longitude?: string;
  contact?: string;
  hompage?: string;
  offDays?: string;
  operationTime?: string;
  chatCount: number;
};
