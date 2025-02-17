import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { USER_STATUS } from './user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(USER_STATUS)
  status: USER_STATUS
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(USER_STATUS)
  status: USER_STATUS
}
export class ListUserPagingDto {
  @IsOptional()
  @IsNumberString()
  page: string

  @IsOptional()
  @IsString()
  size: string

  @IsOptional()
  @IsString()
  keyword: string

  @IsOptional()
  @IsEnum(USER_STATUS)
  status: USER_STATUS
}