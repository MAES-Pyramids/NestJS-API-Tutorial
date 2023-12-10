import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
   @HttpCode(201)
   @Post('Signup')
   async signup(@Body() dto: AuthDto) {
      return await this.authService.signup(dto);
   }

   @HttpCode(HttpStatus.OK) // HttpStatus.OK => 200
   @Post('Login')
   login(@Body() dto: AuthDto) {
      return this.authService.login(dto);
   }
}
