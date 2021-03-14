import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class authCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  // @MinLength(8)
  @MaxLength(20)
  @Matches(
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
    { message: 'password to weak' },
  )
  // @Matches(/((?=.*\d) | (?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
