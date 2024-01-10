import { Controller, Get, Query } from '@nestjs/common';
import { LotenetService } from './lotenet.service';
import { QueryBoletoDto, Respuesta } from './dto/create-lotenet.dto';

@Controller('lotenet')
export class LotenetController {
  constructor(private readonly lotenetService: LotenetService) {}

  @Get()
  async consultarBoleto(@Query() params: QueryBoletoDto): Promise<Respuesta> {
    return this.lotenetService.consultarBoleto(params);
  }
}
