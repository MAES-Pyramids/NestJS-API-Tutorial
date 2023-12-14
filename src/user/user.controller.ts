import {
   Body,
   Controller,
   Get,
   Patch,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { MorganInterceptor } from 'nest-morgan';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
   constructor(private userService: UserService) {}

   @UseInterceptors(MorganInterceptor('combined'))
   @Get('me')
   getMe(@GetUser() user: User) {
      return user;
   }

   @Patch('me')
   editMe(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
      return this.userService.editUser(userId, dto);
   }
}
