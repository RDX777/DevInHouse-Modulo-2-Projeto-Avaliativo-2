import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioComAuthController {

  @Get("comauth")
  public comaut() {
    console.log("Com autenticação")
  }
}
