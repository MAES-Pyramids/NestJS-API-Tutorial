import {
   IsEmail,
   IsEnum,
   IsNotEmpty,
   IsString,
   IsStrongPassword,
} from 'class-validator';
// Note: we can use joi instead of class-validator

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

   @IsEnum(['male', 'female'], {
      message: 'sorry, u are only allowed to be male or female',
   })
   gender: 'male' | 'female';
}
