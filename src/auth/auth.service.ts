import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { Message: 'I am logged in' };
  }
  signup() {
    return { Message: 'I am signed up' };
  }
}
