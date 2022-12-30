import { RetornoDispositivoFiltradoDto } from "./retorno-dispositivo-filtrado.dto";

export class RetornoDispositivoDto {

  readonly nomeUsuario: string;
  readonly listaDispositivos: RetornoDispositivoFiltradoDto[];

}