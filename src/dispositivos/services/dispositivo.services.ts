import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { UsuarioEntity } from "src/usuarios/entities/usuario.entity";
import { DispositivoEntity } from "../entities/dispositivo.entity";
import { RetornoDispositivoDto } from "../dtos/retorno-dispositivos.dto";
import { LocalDto } from "src/locais/dtos/local.dto";
import { RetornoDispositivoFiltradoDto } from "../dtos/retorno-dispositivo-filtrado.dto";
import { VinculoDispositivoInDto } from "../dtos/vinculo-dispositivo-in.dto";
import { LocalService } from "src/locais/services/local.service";
import { VinculoDispositivoOutDto } from "../dtos/vinculo-dispositivo-out.dto";

@Injectable()
export class DispositivoService {

  constructor(
    @Inject('DISPOSITIVO_REPOSITORY')
    private dispositivoRepository: Repository<DispositivoEntity>,
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
    private localService: LocalService) { }

  public async listar(usuario: object, local: string): Promise<RetornoDispositivoDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const dadosDispositivo = await this.localService.localizaLocal(usuario);

        const listaDispositivos = this.coletaDispositivos(dadosDispositivo, local)

        const listaCompleta = {
          nomeUsuario: usuario["nome"],
          listaDispositivos: listaDispositivos
        }

        resolve(listaCompleta);
      } catch (erro) {
        reject(erro);
      }
    })
  }

  private coletaDispositivos(dadosDispositivo: Array<LocalDto>, local: string | null): Array<RetornoDispositivoFiltradoDto> {

    if (local) {
      const dispositivoFiltrado = dadosDispositivo.filter(dispositivo => dispositivo.local.toLowerCase().includes(local.toLowerCase()));
      return this.coletaTodosDispositivos(dispositivoFiltrado);
    }
    return this.coletaTodosDispositivos(dadosDispositivo);
  }

  private coletaTodosDispositivos(dadosDispositivo: Array<LocalDto>): Array<RetornoDispositivoFiltradoDto> {
    return dadosDispositivo.map(dispositivo => {
      return {
        nomeDispositivo: dispositivo.dispositivo.nome,
        tipo: dispositivo.dispositivo.tipo,
        fabricante: dispositivo.dispositivo.fabricante,
        local: dispositivo.local,
        estado: dispositivo.estado,
        informacoes: dispositivo.dispositivo.informacoes,
        enderecoIP: dispositivo.enderecoIP,
        enderecoMAC: dispositivo.dispositivo.enderecoMAC,

      }
    })
  }

  public async vincular(usuario: object, body: VinculoDispositivoInDto): Promise<VinculoDispositivoOutDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const jaVimnculado = await this.localService.jaAtribuido(usuario, +body.id);
        if (!jaVimnculado) {
          const dispositivoSalvo = await this.localService.insereLocal(usuario, body);
          resolve(dispositivoSalvo);
        }
        throw new ForbiddenException("Dispositivo ja vinculado")
      } catch (erro) {
        reject(erro)
      }
    })

  }

}
