import { Inject, Injectable } from "@nestjs/common";
import { VinculoDispositivoInDto } from "src/dispositivos/dtos/vinculo-dispositivo-in.dto";
import { VinculoDispositivoOutDto } from "src/dispositivos/dtos/vinculo-dispositivo-out.dto";
import { Repository } from 'typeorm';
import { LocalDto } from "../dtos/local.dto";
import { LocalEntity } from "../entities/local.entity";

@Injectable()
export class LocalService {

  constructor(
    @Inject('LOCAL_REPOSITORY')
    private localRepository: Repository<LocalEntity>) { }

  public async localizaLocal(usuario: any): Promise<Array<LocalDto>> {
    return new Promise(async (resolve, reject) => {
      try {
        const locais = await this.localRepository.find({
          relations: {
            usuario: false,
            dispositivo: true
          },
          where: {
            usuario: {
              id: usuario["id"]
            },
          },
        })
        resolve(locais);
      } catch (erro) {
        reject(erro);
      }
    })
  }

  public async insereLocal(usuario: object, body: VinculoDispositivoInDto): Promise<VinculoDispositivoOutDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const novaVinculacao = new LocalEntity();
        novaVinculacao.local = body["local"];
        novaVinculacao.dispositivo = body["id"];
        novaVinculacao.usuario = usuario["id"]
        novaVinculacao.enderecoIP = body["enderecoIP"] ? body["enderecoIP"] : null;
        novaVinculacao.estado = false;
        const vinculado = await this.localRepository.save(novaVinculacao);
        resolve(vinculado);
      } catch (erro) {
        reject(erro);
      }
    })
  }

  public async jaAtribuido(usuario: object, dispositivoId: number): Promise<LocalEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const javinculado = await this.localRepository.findOne({
          where: {
            usuario: {
              id: usuario["id"]
            },
            dispositivo: {
              id: dispositivoId
            }
          }
        })
        resolve(javinculado);
      } catch (erro) {
        reject(erro);
      }
    })
  }
}