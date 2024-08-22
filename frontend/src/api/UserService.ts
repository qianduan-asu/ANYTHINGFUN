// src/api/UserService.ts
import axiosInstance from './axiosInstance';
import { User } from './types';

class UserService {
  static async getUserById(userId: string): Promise<User> {
    try {
      const response = await axiosInstance.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await axiosInstance.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  
}

export default UserService;
