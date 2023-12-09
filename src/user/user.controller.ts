import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
   @Get()
   @UseGuards(JwtGuard)
   getUsers(@Req() req: Request) {
      return req.user;
   }
}
