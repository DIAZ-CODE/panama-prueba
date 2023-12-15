import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as https from 'https';
import { addDays, format } from 'date-fns';
import axios from 'axios';
import { ConfigType } from '@nestjs/config';

//Propio
import { BoletoInfo, QueryBoletoDto } from './dto/create-lotenet.dto';
import { MESSAGE } from 'src/config/message';
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
        timeout: 10000,
      });
      const data = response.data;
      const consultarStatus = this.validarData(data);
      return consultarStatus;
    } catch (e) {
      if (e.response && e.response.status === 422) {
        throw new BadRequestException(MESSAGE.BOLETO_NO_EXISTE);
      }
      throw new BadRequestException(MESSAGE.NO_SE_PUDO_ACCEDER_A_LA_URL);
    }
  }

  private validarData(data: any): BoletoInfo {
    if (data.sorteo.premios == null) {
      return {
        serial: data.serialkey,
        status: MESSAGE.BOLETO_ACTIVO,
        monto_ganador: 0,
      };
    }
    const monto = this.sumarMontoGanador(data.jugadas);
    if (monto === 0) {
      return {
        serial: data.serialkey,
        status: MESSAGE.BOLETO_NO_GANADOR,
        monto_ganador: monto,
      };
    }

    if (data.pago) {
      return {
        serial: data.serialkey,
        status: data.pago.canjeado_por
          ? MESSAGE.BOLETO_CANJEADO
          : MESSAGE.BOLETO_PAGADO,
        monto_ganador: monto,
      };
    }

    const fecha_sorteo = data.created_at.substring(0, 10);
    const dia_caduca = data.caduca;
    const validar_vencimiento = this.saberCaducado(fecha_sorteo, dia_caduca);
    return {
      serial: data.serialkey,
      status: validar_vencimiento
        ? MESSAGE.BOLETO_CADUCADO
        : MESSAGE.BOLETO_GANADOR,
      monto_ganador: monto,
    };
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

  private saberCaducado(fecha_sorteo: string, dias: number): boolean {
    const fecha_vencimiento = this.sumarDiasAFecha(fecha_sorteo, dias);
    const fechaHoy = new Date();
    return fechaHoy > fecha_vencimiento;
  }

  private sumarDiasAFecha(fecha: string, diasASumar: number): Date {
    const fechaObj = new Date(fecha);
    return addDays(fechaObj, diasASumar);
  }
}
