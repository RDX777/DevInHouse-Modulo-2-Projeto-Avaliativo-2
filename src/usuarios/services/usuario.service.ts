import { forwardRef, Inject, Injectable, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/core/auth/services/auth.service";
import { UsuarioEntity } from "../entities/usuario.entity";
import { CriaUsuarioDto } from "../dtos/cria-usuario.dto";
import { EnderecoService } from "src/enderecos/services/endereco.service";

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private enderecoService: EnderecoService
  ) { }

  public async store(usuario: CriaUsuarioDto): Promise<object> {
    return new Promise(async (resolve, reject) => {
      let enderecoId = null;
      try {
        if (usuario.endereco) {
          enderecoId = await this.enderecoService.salva(usuario.endereco);
        }
        const novoUsuario = new UsuarioEntity();
        novoUsuario.nomeCompleto = usuario.nomeCompleto;
        novoUsuario.urlFoto = usuario.urlFoto ? usuario.urlFoto : null
        novoUsuario.email = usuario.email;
        novoUsuario.salt = await bcrypt.genSalt(12)
        novoUsuario.senha = await bcrypt.hash(usuario.senha, novoUsuario.salt);
        novoUsuario.telefone = usuario.telefone;
        novoUsuario.status = true;
        novoUsuario.endereco = enderecoId;
        const resposta = await this.usuarioRepository.save(novoUsuario);
        const { id } = resposta;
        resolve({ usuarioId: id });
      } catch (erro) {
        reject(erro);
      }
    })
  }

  private async criaSalt(saltos: number): Promise<string> {
    return await bcrypt.genSalt(saltos)
  }

}