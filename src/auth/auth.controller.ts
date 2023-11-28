import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @Post('Login')
   signup(@Body() dto: AuthDto) {
      return this.authService.signup(dto);
   }

   @Post('Signup')
   login(req, res) {
      return this.authService.login();
   }
}
