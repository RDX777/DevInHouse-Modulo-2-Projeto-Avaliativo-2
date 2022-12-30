import { Controller, Get, UseGuards, Request, Query, Post, Body, HttpStatus } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/auth/guards/jwt-auth.guard";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { RespostaHttpService } from "src/core/http/services/resposta-http.service";
import { VinculoDispositivoInDto } from "../dtos/vinculo-dispositivo-in.dto";
import { DispositivoService } from "../services/dispositivo.services";

@UseGuards(JwtAuthGuard)
@Controller('dispositivo')
export class DispositivoController {

  constructor(private dispositivoService: DispositivoService,
    private respostaHttp: RespostaHttpService) { }

  @Get("listar")
  public async listar(@Request() request: any, @Query('local') local: string) {

    return await this.dispositivoService.listar(request.user, local).then((resposta) => {
      return this.respostaHttp.responde(HttpStatus.OK, "dispositivo/listar", resposta)

    }).catch((erro) => {
      return this.respostaHttp.responde(HttpStatus.BAD_REQUEST, "dispositivo/listar", { message: erro })
    });

  }

  @Post("vincular")
  public async vincular(@Request() request: any, @Body() body: VinculoDispositivoInDto) {
    return await this.dispositivoService.vincular(request.user, body).then((resposta) => {
      return this.respostaHttp.responde(HttpStatus.OK, "dispositivo/vincular", resposta)
    }).catch((erro) => {
      return this.respostaHttp.responde(HttpStatus.BAD_REQUEST, "dispositivo/vincular", { message: erro })
    });
  }
}