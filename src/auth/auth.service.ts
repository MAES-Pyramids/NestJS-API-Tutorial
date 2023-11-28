import * as argon from 'argon2';
import { AuthDto } from './dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
   constructor(private prisma: PrismaService) {}
   login() {
      return { Message: 'I am logged in' };
   }

   async signup(dto: AuthDto) {
      // Hash the password
      const hashedPass = await argon.hash(dto.password);
      // Create a new user
      const user = await this.prisma.user.create({
         data: {
            first_name: dto.first_name,
            email: dto.email,
            hashedPass,
         },
      });
      // return the user
      return user;
   }
}
