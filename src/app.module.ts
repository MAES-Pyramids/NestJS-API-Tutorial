import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      AuthModule,
      UserModule,
      BookmarkModule,
      PrismaModule,
      MorganModule,
   ],
   providers: [
      {
         provide: APP_INTERCEPTOR,
         useClass: MorganInterceptor('dev'),
      },
   ],
})
export class AppModule {}
