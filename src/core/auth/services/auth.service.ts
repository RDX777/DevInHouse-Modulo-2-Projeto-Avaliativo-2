import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { CredenciaisDTO } from "../dto/credenciais-usuario.dto";
import { UsuarioService } from "src/usuarios/services/usuario.service";

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService,
    @Inject(forwardRef(() => UsuarioService))
    private usuarioService: UsuarioService) { }


}