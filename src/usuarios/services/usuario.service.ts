import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/core/auth/services/auth.service";
import { UsuarioEntity } from "../entities/usuario.entity";
import { CriaUsuarioDto } from "../dtos/cria-usuario.dto";
import { EnderecoService } from "src/enderecos/services/endereco.service";
import { CredenciaisDTO } from "src/core/auth/dto/credenciais-usuario.dto";
import { RetornoVerificacaoSenhaDto } from "../dtos/retorno-verificacao-senha.dto";
import { TrocaSenhaDto } from "../dtos/troca-senha.dto";

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

  public async verificaCredenciais(credenciais: CredenciaisDTO): Promise<RetornoVerificacaoSenhaDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, senha } = credenciais;

        const usuario = await this.usuarioRepository.findOne({
          where: {
            email: email,
            status: true,
          }
        }
        )

        if (usuario && await this.checaSenha(senha, usuario)) {
          const dadosUsuario = {
            id: usuario.id,
            nome: usuario.nomeCompleto,
            urlFoto: usuario.urlFoto,
            email: usuario.email,
          }
          resolve(dadosUsuario)
        }
        throw new UnauthorizedException('E-mail e/ou senha incorretos')
      } catch (erro) {
        reject(erro)
      }
    })
  }

  private async checaSenha(senha: string, usuario: UsuarioEntity): Promise<boolean> {
    const hash = await bcrypt.hash(senha, usuario.salt)
    return hash === usuario.senha;
  }

  public async trocasenha(dadosUsuario: object, senhas: TrocaSenhaDto) {
    const usuarioAtual = {
      email: dadosUsuario["email"],
      senha: senhas.senhaAtual
    }
    const usuario = await this.verificaCredenciais(usuarioAtual);
    const saltoUsuario = await await bcrypt.genSalt(12);
    const hashSenha = await bcrypt.hash(senhas.senhaNova, saltoUsuario);
    this.usuarioRepository.update({ id: usuario.id }, { senha: hashSenha, salt: saltoUsuario });
  }

}