import { MinLength, IsString, IsOptional, IsEmail} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsString()
  @IsOptional()
  file!: string;
}