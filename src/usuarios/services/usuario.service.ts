import { forwardRef, Inject, Injectable, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/core/auth/services/auth.service";
import { UsuarioEntity } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }

}