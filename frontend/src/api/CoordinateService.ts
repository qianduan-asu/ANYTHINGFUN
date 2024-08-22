// src/api/CoordinateService.ts
import axiosInstance from './axiosInstance';
import { Coordinate } from './types';

class CoordinateService {
  static async getCoordinatesById(coordinateId: string): Promise<Coordinate> {
    try {
      const response = await axiosInstance.get<Coordinate>(`/coordinates/${coordinateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }

  static async getAllCoordinates(): Promise<Coordinate[]> {
    try {
      const response = await axiosInstance.get<Coordinate[]>('/coordinates');
      return response.data;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }
}

export default CoordinateService;
