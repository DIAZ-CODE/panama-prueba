import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as https from 'https';

import { BoletoInfo, QueryBoletoDto } from './dto/create-lotenet.dto';
import { MESSAGE } from 'src/config/message';
import axios from 'axios';
import { ConfigType } from '@nestjs/config';
import { config } from 'src/config/config';

@Injectable()
export class LotenetService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async consultarBoleto(data: QueryBoletoDto): Promise<BoletoInfo> {
    const boleto = await this.peticionLotenet(data.id_boleto);
    return boleto;
  }

  private async peticionLotenet(id_boleto: string): Promise<BoletoInfo> {
    try {
      const url = `${this.configService.URL_PLATFORM}/api/boletos/${id_boleto}`;
      const agent = new https.Agent({
        rejectUnauthorized: false, // Ignora la verificación del certificado
      });
      const response = await axios.get(url, {
        httpsAgent: agent,
      });
      const data = response.data;
      const consultarStatus = this.validarData(data);
      return consultarStatus;
    } catch (e) {
      if ((e.response.status = 422)) {
        throw new BadRequestException(MESSAGE.BOLETO_NO_EXISTE);
      }
      throw new BadRequestException(MESSAGE.NO_SE_PUDO_ACCEDER_A_LA_URL);
    }
  }

  private validarData(data: any): BoletoInfo {
    if (data.sorteo.premios == null) {
      return {
        monto_ganador: 0,
        status: MESSAGE.BOLETO_ACTIVO,
        serial: data.serialkey,
      };
    }
    const monto = this.sumarMontoGanador(data.jugadas);
    return {
      monto_ganador: monto,
      serial: data.serialkey,
      status:
        monto === 0
          ? MESSAGE.BOLETO_NO_GANADOR
          : !data.pago
          ? MESSAGE.BOLETO_GANADOR
          : MESSAGE.BOLETO_PAGADO,
    };
    //if (monto === 0) {
    //  return {
    //    monto_ganador: monto,
    //    serial: data.serialkey,
    //    status: MESSAGE.BOLETO_NO_GANADOR,
    //  };
    //}
    //
    //if (!data.pago) {
    //  return {
    //    monto_ganador: monto,
    //    status: MESSAGE.BOLETO_GANADOR,
    //    serial: data.serialkey,
    //  };
    //}
    //
    //return {
    //  monto_ganador: monto,
    //  status: MESSAGE.BOLETO_PAGADO,
    //  serial: data.serialkey,
    //};
  }

  private sumarMontoGanador(data: any): number {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].monto_pagado !== null) {
        total += parseFloat(data[i].monto_pagado);
      }
    }
    return total;
  }
}
