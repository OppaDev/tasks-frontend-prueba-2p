import ApiService from './ApiService';
import { User } from '../models/User';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export default class AuthService extends ApiService {
  async login(username: string, password: string): Promise<string> {
    const response = await this.post('/login/', { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token);  // Guarda el token
    return token;
  }

  async register(data: RegisterData): Promise<User> {
    const response = await this.post('/register/', data);
    return new User(
      response.data.username,
      response.data.email,
      response.data.first_name,
      response.data.last_name
    );
  }

  async logout(): Promise<void> {
    try {
      await this.post('/logout/', {});
    } finally {
      localStorage.removeItem('token');
    }
  }
}