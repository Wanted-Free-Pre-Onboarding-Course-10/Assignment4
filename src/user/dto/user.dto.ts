import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UserDto{
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  @Matches(/^[a-zA-Z0-9]*$/,{
    message: 'password only accepts eng and num'
  })
  password: string;
}