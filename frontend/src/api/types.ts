// src/api/types.ts
export interface User {
    id: string;
    name: string;
    avatar: string;
    coordinates: string;
    onlineSince:string;
  }
  
  export interface Coordinate {
    latitude: number;
    longitude: number;
    description:string;
  }
  