import { Inject, Injectable } from '@nestjs/common';
import * as https from 'https';
import { addDays } from 'date-fns';
import axios from 'axios';
import { ConfigType } from '@nestjs/config';

//Propio
import { QueryBoletoDto, Respuesta } from './dto/create-lotenet.dto';
import { MESSAGE } from 'src/config/message';
import { config } from 'src/config/config';
import { MessageService } from './message.service';

@Injectable()
export class LotenetService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly messageService: MessageService,
  ) {}

  async consultarBoleto(data: QueryBoletoDto): Promise<Respuesta> {
    const boleto = await this.peticionLotenet(data.id_boleto);
    return boleto;
  }

  private async peticionLotenet(id_boleto: string): Promise<Respuesta> {
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
        const message = this.messageService.codeByMessage(106);
        return {
          code: 106,
          error: false,
          status: {
            message: message,
            monto_ganador: 0,
          },
        };
      }
      return {
        code: 108,
        error: true,
        status: {
          message: MESSAGE.NO_SE_PUDO_ACCEDER_A_LA_URL,
          monto_ganador: 0,
        },
      };
    }
  }

  private validarData(data: any): Respuesta {
    //!NO HAY PREMIO EN EL SORTEO
    if (
      data.sorteo.premios === null ||
      (Array.isArray(data.sorteo.premios) && data.sorteo.premios.length === 0)
    ) {
      const message = this.messageService.codeByMessage(102);

      return {
        code: 102,
        error: false,
        status: {
          message: message,
          monto_ganador: 0,
        },
      };
    }

    const monto = this.sumarMontoGanador(data.jugadas);

    //!NO HAY MONTON GANADOR
    if (monto === 0) {
      const message = this.messageService.codeByMessage(101);
      return {
        code: 101,
        error: false,
        status: {
          message: message,
          monto_ganador: 0,
        },
      };
    }

    //!Esta pago
    if (data.pago) {
      //!Esta Canjeado
      if (data.pago.canjeado_por)
        return {
          code: 105,
          error: false,
          status: {
            message: MESSAGE.BOLETO_CANJEADO,
            monto_ganador: monto,
          },
        };
      const message = this.messageService.codeByMessage(107);
      return {
        code: 107,
        error: false,
        status: {
          message: message,
          monto_ganador: monto,
        },
      };
    }

    const fecha_sorteo = data.created_at.substring(0, 10);
    const dia_caduca = data.caduca;
    const validar_vencimiento = this.saberCaducado(fecha_sorteo, dia_caduca);

    //! Esta vencido
    if (validar_vencimiento)
      return {
        code: 103,
        error: false,
        status: {
          message: MESSAGE.BOLETO_CADUCADO,
          monto_ganador: monto,
        },
      };

    //! Solo Ganador
    const message = this.messageService.codeByMessage(100);
    return {
      code: 100,
      error: false,
      status: {
        message: message,
        monto_ganador: monto,
      },
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
