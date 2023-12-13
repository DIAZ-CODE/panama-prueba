import { Controller, Get, Query } from '@nestjs/common';
import { LotenetService } from './lotenet.service';
import { BoletoInfo, QueryBoletoDto } from './dto/create-lotenet.dto';

@Controller('lotenet')
export class LotenetController {
  constructor(private readonly lotenetService: LotenetService) {}

  @Get()
  async consultarBoleto(@Query() params: QueryBoletoDto): Promise<BoletoInfo> {
    return this.lotenetService.consultarBoleto(params);
  }
}
