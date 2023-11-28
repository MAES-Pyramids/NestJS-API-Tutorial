import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { Message: 'I am logged in' };
  }
  signup() {
    return { Message: 'I am signed up' };
  }
}
