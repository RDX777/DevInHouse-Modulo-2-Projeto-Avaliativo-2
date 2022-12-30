import { DispositivoDto } from "src/dispositivos/dtos/dispositivos.dto";
import { CriaUsuarioDto } from "src/usuarios/dtos/cria-usuario.dto";

export class LocalDto {

  readonly usuario: CriaUsuarioDto
  readonly dispositivo: DispositivoDto;
}