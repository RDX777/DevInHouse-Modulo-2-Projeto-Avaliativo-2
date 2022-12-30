import { DispositivoDto } from "src/dispositivos/dtos/dispositivos.dto";

export class LocalDto {
  readonly id: number;
  readonly local: string;
  readonly estado: boolean;
  readonly enderecoIP: string;
  readonly dispositivo: DispositivoDto;
}