import * as argon from 'argon2';
import { AuthDto } from './dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
   constructor(private prisma: PrismaService) {}

   async login(dto: AuthDto) {
      // Find user by email address
      const user = await this.prisma.user.findUnique({
         where: {
            email: dto.email,
         },
      });
      if (!user) throw new ForbiddenException('User not found');
      // verify user password
      const passMatch = await argon.verify(user.hashedPass, dto.password);
      if (!passMatch) throw new ForbiddenException('Password mismatch');

      delete user.hashedPass;
      return user;
   }

   async signup(dto: AuthDto) {
      try {
         // Hash the password
         const hashedPass = await argon.hash(dto.password);
         // Create a new user
         const user = await this.prisma.user.create({
            data: {
               first_name: dto.first_name,
               email: dto.email,
               hashedPass,
            },
            select: {
               first_name: true,
               email: true,
            },
         });
         return user;
      } catch (error) {
         if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002')
               throw new ForbiddenException('Credentials tokens');
         }
         throw error;
      }
   }
}
