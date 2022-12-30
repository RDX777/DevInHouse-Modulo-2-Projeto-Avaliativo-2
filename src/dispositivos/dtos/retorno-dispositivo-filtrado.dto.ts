export class RetornoDispositivoFiltradoDto {

  readonly nomeDispositivo: string;
  readonly tipo: string;
  readonly fabricante: string;
  readonly local: string;
  readonly estado: boolean | string;
  readonly informacoes: string;
  readonly enderecoIP: string;
  readonly enderecoMAC: string;

}