import { Injectable, Inject, ForbiddenException, NotFoundException } from "@nestjs/common";
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

  public async detalheDispositivo(usuario: object, parametro: number): Promise<RetornoDispositivoFiltradoDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const detalhe = await this.dispositivoRepository.findOneOrFail({
          where: {
            id: parametro,
            local: {
              usuario: usuario["id"]
            }
          },
          relations: {
            local: true
          }
        });
        if (detalhe) {
          const detalhes = this.coletaLocal(detalhe)
          resolve(detalhes)
        }
      } catch (erro) {
        reject(erro)
      }
    });

  }

  private coletaLocal(dispositivo: DispositivoEntity): RetornoDispositivoFiltradoDto {
    try {
      return {
        nomeDispositivo: dispositivo.nome,
        tipo: dispositivo.tipo,
        fabricante: dispositivo.fabricante,
        local: dispositivo.local[0] ? dispositivo.local[0]["local"] : "Dispositivo não vinculado a este usuario",
        estado: dispositivo.local[0] ? dispositivo.local[0]["estado"] : "Dispositivo não vinculado a este usuario",
        informacoes: dispositivo.informacoes,
        enderecoIP: dispositivo.local[0] ? dispositivo.local[0]["enderecoIP"] : "Dispositivo não vinculado a este usuario",
        enderecoMAC: dispositivo.enderecoMAC
      }
    } catch (erro) {
      console.log(erro)
    }
  }

}
