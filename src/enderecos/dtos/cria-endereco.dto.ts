import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { CriaUsuarioDto } from "src/usuarios/dtos/cria-usuario.dto";

export class CriaEnderecoDto {

  @IsNumber()
  @IsNotEmpty()
  readonly cep: number;

  @IsNotEmpty()
  @IsString()
  readonly logradouro: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numero: number;

  @IsNotEmpty()
  @IsString()
  readonly bairro: string;

  @IsNotEmpty()
  @IsString()
  readonly cidade: string;

  @IsNotEmpty()
  @IsString()
  readonly estado: string;

  readonly complemento: string;

}