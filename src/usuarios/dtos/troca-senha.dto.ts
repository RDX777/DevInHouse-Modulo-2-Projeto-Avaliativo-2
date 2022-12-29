import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Match } from "src/core/constraints/match.decorator";

export class TrocaSenhaDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly senhaAtual: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Match(["senhaAtual", "different"])
  readonly senhaNova: string;

  @Match(["senhaNova", "equals"])
  readonly confirmacaoSenhaNova: string;
}