export interface IAdresses {
  street: string;
  zipcode: string;
  city: string;
  state: string;
  localization: {
    lat: number;
    lng: number;
  };
  phone: string;
  time: {
    open: string;
    close: string;
  }
}

export interface IAdressDetails {
  store: number;
  list: IAdresses[];
  storeDetails: IList;
}
export interface IList {
  id: number;
  label: string;
  logo: string;
  rating: string;
  favorite: boolean;
  category: string[];
}

export interface IStoreDetails {
  store: number;
  percentage: number;
  expires_in?: Date;
  coupon_code?: string;
  rules?: string;
  storeDetails: IList;
}

export interface ILocalization {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
