import { User } from "../models/User";
import AuthService from "../services/AuthService";

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(username: string, password: string): Promise<string> {
    return await this.authService.login(username, password);
  }

  async register(user: User, password: string): Promise<User> {
    return await this.authService.register(user, password);
  }
}
