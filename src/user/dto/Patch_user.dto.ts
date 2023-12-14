import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
   @IsString()
   @IsOptional()
   first_name?: string;

   @IsEmail()
   @IsOptional()
   email?: string;

   @IsEnum(['MALE', 'FEMALE', 'OTHER'], {
      message: 'sorry, u are only allowed to be male or female',
   })
   gender?: 'MALE' | 'FEMALE' | 'OTHER';
}
