import {
   IsEmail,
   IsNotEmpty,
   IsString,
   IsStrongPassword,
} from 'class-validator';

export class AuthDto {
   @IsString()
   @IsNotEmpty()
   first_name: string;

   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsStrongPassword()
   @IsNotEmpty()
   password: string;
}
