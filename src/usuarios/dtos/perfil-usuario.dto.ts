import { EnderecoEntity } from "src/enderecos/entities/endereco.entity";

export class PerfilUsuarioDto {
  readonly nomeCompleto: string;
  readonly urlFoto: string;
  readonly email: string;
  readonly telefone: string;
  readonly endereco: EnderecoEntity
}