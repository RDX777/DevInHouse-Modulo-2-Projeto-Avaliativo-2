import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";
import { DispositivoEntity } from "../entities/dispositivo.entity";

export class VinculoDispositivoOutDto {

  readonly local: string;
  readonly dispositivo: DispositivoEntity;
  readonly usuario: UsuarioEntity;
  readonly enderecoIP: string;
  readonly estado: boolean;
  readonly id: number;

}