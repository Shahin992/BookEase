import { ISignInResponse } from '@/data/mockReservations';
import { apiRequest } from './apiClient';
import { USER_ENDPOINTS } from './endPoints';


export const createUser = async (user: { fullName: string; email: string; password: string }) =>
  apiRequest('post',USER_ENDPOINTS.signUp, user);

export const signinUser = async (credentials: { email: string; password: string }) =>
    apiRequest<ISignInResponse>('post', USER_ENDPOINTS.signIn, credentials);