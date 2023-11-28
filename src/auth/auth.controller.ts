import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @Post('Signup')
   async signup(@Body() dto: AuthDto) {
      return await this.authService.signup(dto);
   }

   @Post('Login')
   login(@Body() dto: AuthDto) {
      return this.authService.login(dto);
   }
}
