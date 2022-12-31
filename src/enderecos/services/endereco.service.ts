import { Inject, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { CriaEnderecoDto } from "../dtos/cria-endereco.dto";
import { RetornoCriaEnderecoDto } from "../dtos/retorno-cria-endereco.dto";
import { EnderecoEntity } from "../entities/endereco.entity";

@Injectable()
export class EnderecoService {

  constructor(
    @Inject('ENDERECO_REPOSITORY')
    private enderecoRepository: Repository<EnderecoEntity>,
  ) { }

  public async salva(endereco: CriaEnderecoDto): Promise<RetornoCriaEnderecoDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const enderecoAntigo = await this.enderecoRepository.findOne({
          where: {
            cep: endereco.cep,
            numero: endereco.numero
          }
        })

        let enderecoId = null;
        if (enderecoAntigo) {
          const { id } = enderecoAntigo
          enderecoId = id;
        } else {
          const resposta = await this.enderecoRepository.insert(endereco)
          const { id } = (resposta).identifiers[0];
          enderecoId = id;
        }

        resolve(enderecoId);
      } catch (erro) {
        reject(erro)
      }
    })
  }
}