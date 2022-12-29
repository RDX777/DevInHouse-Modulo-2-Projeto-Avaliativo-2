import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";

import { Match } from "src/core/constraints/match.decorator";
import { CriaEnderecoDto } from "src/enderecos/dtos/cria-endereco.dto";

export class CriaUsuarioDto {

  @IsString()
  @IsNotEmpty()
  readonly nomeCompleto: string;

  readonly urlFoto: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly senha: string;

  @Match(["senha", "equals"])
  readonly confirmaSenha: string;

  readonly telefone: string;

  @ValidateNested()
  @Type(() => CriaEnderecoDto)
  readonly endereco: CriaEnderecoDto;
}
