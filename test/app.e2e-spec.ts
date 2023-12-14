import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

describe('AppController (e2e)', () => {
   let app: INestApplication;
   let prisma: PrismaService;

   beforeAll(async () => {
      const moduleFixture = await Test.createTestingModule({
         imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(
         new ValidationPipe({
            whitelist: true,
         }),
      );
      await app.init();
      await app.listen(3333);

      prisma = app.get(PrismaService);
      await prisma.cleanDb();

      pactum.request.setBaseUrl('http://localhost:3333');
   });

   afterAll(() => {
      app.close();
   });

   describe('Auth', () => {
      const AuthDto: AuthDto = {
         first_name: 'MAES',
         email: 'vdfvvdvsdf@me.com',
         password: 'sdM2dssd1111$s121',
         gender: 'MALE',
      };

      describe('Signup', () => {
         it('should throw if email empty', () => {
            return pactum
               .spec()
               .post('/auth/signup')
               .withBody({
                  password: AuthDto.password,
               })
               .expectStatus(400);
         });
         it('should throw if password empty', () => {
            return pactum
               .spec()
               .post('/auth/signup')
               .withBody({
                  email: AuthDto.email,
               })
               .expectStatus(400);
         });
         it('should throw if no body provided', () => {
            return pactum.spec().post('/auth/signup').expectStatus(400);
         });
         it('should signup', () => {
            return pactum
               .spec()
               .post('/auth/signup')
               .withBody(AuthDto)
               .expectStatus(201);
         });
      });

      describe('Signing', () => {
         it('should throw if email empty', () => {
            return pactum
               .spec()
               .post('/auth/login')
               .withBody({
                  password: AuthDto.password,
               })
               .expectStatus(400);
         });
         it('should throw if password empty', () => {
            return pactum
               .spec()
               .post('/auth/login')
               .withBody({
                  email: AuthDto.email,
               })
               .expectStatus(400);
         });
         it('should throw if no body provided', () => {
            return pactum.spec().post('/auth/login').expectStatus(400);
         });
         it('should Login', () => {
            return pactum
               .spec()
               .post('/auth/login')
               .withBody(AuthDto)
               .expectStatus(200)
               .stores('userAt', 'access_token');
         });
      });
   });

   describe('User', () => {
      const AuthHeader = {
         Authorization: 'Bearer $S{userAt}',
      };

      const EditDto: EditUserDto = {
         first_name: 'Edited User',
         gender: 'OTHER',
      };

      describe('Get me', () => {
         it('should get current user', () => {
            return pactum
               .spec()
               .get('/user/me')
               .withHeaders(AuthHeader)
               .expectStatus(200);
         });
      });

      describe('Edit user', () => {
         it('should edit current user', () => {
            return pactum
               .spec()
               .patch('/user/me')
               .withHeaders(AuthHeader)
               .withBody(EditDto)
               .expectStatus(200)
               .expectBodyContains(EditDto.gender);
         });
      });
   });
});
