  export interface IStore {
    id: number;
    label: string;
    logo: string;
    rating: string;
    favorite: boolean;
    category: string[];
    addresses: IAdresses[];
  }

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