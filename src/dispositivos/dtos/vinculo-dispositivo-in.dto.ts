import { IsEnum, IsNotEmpty } from "class-validator";
import { LocalDispositivo } from "src/locais/utils/local.enum";
import { DispositivoEntity } from "../entities/dispositivo.entity";

export class VinculoDispositivoInDto {

  readonly id: DispositivoEntity;

  @IsNotEmpty()
  @IsEnum(LocalDispositivo)
  readonly local: LocalDispositivo;

  readonly enderecoIP: string;

}