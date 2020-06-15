export interface location {
    lat: number;
    lng: number;
  }
  
 export interface Address {
    user_id: number;
    title: string;
    address: string;
    staticMapImageUrl: string;
    location: location;
  }