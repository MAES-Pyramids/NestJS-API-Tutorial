import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
   constructor(private userService: UserService) {}

   @Get('me')
   getMe(@GetUser() user: User) {
      return user;
   }

   @Patch('me')
   editMe(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
      return this.userService.editUser(userId, dto);
   }
}
