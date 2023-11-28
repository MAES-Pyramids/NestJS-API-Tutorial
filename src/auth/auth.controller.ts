import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('Login')
  login(@Req() req: Request, res: Response) {
    console.log(req.body);
    return this.authService.login();
  }

  @Post('Signup')
  signup(req, res) {
    return this.authService.signup();
  }
}
