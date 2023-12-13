import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
   constructor(config: ConfigService) {
      const NodeEnvironment: string = config.get('NODE_ENV');
      const url: string =
         NodeEnvironment == 'testing'
            ? config.get('DATABASE_Testing_URL')
            : config.get('DATABASE_URL');

      super({
         datasources: {
            db: {
               url,
            },
         },
      });
   }
}
