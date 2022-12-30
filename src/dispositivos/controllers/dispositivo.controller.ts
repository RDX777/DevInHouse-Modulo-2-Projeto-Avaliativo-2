import { Controller, Get, UseGuards, Request, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { DispositivoService } from "../services/dispositivo.services";

@UseGuards(JwtAuthGuard)
@Controller('dispositivo')
export class DispositivoController {

  constructor(private dispositivoService: DispositivoService) { }

  @Get("listar")
  public async listar(@Request() request: any, @Query('local') local: string) {

    return await this.dispositivoService.listar(request.user, local);

  }
}