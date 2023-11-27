import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('Login')
  login(req, res) {
    return this.authService.login();
  }

  @Post('Signup')
  signup(req, res) {
    return this.authService.signup();
  }
}
