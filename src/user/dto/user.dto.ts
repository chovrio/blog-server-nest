import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  name: string;
  password: string;
  info: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserDto {
  name: string;
  password: string;
}
