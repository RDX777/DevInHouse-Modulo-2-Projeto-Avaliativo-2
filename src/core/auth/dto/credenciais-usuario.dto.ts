import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CredenciaisDTO {
  @IsString()
  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @IsNotEmpty()
  readonly senha: string;

}