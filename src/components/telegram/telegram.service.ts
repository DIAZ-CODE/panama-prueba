import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Update } from '@telegraf/types';
import { config } from 'src/config/config';
import { Context, Telegraf } from 'telegraf';
//import { message } from 'telegraf/filters';
import { LotenetService } from '../lotenet/lotenet.service';

@Injectable()
export class TelegramService {
  private bot: Telegraf<Context<Update>>;
  private userstate = {};

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly lotenetService: LotenetService,
  ) {
    this.bot = new Telegraf(this.configService.TOKEN_TELEGRAM);
    this.bot.launch();
  }

  // Métodos para gestionar el estado por usuario
  setUserState(userId: number, state: string) {
    this.userstate[userId] = state;
  }

  getUserState(userId: number): string {
    return this.userstate[userId];
  }

  //Este es el comando de Start, que es para suscribir los users
  async cmd_start() {
    this.bot.start(async (ctx) => {
      const name = String(ctx.from.first_name);
      ctx.reply(
        `Hola ${name}, si deseas contultar un boletos manda /consultarBoleto`,
      );
    });
  }

  async consultarBoletoComando() {
    this.bot.command('consultarBoleto', async (ctx) => {
      await ctx.reply('Cual serial deseas consultar?');
      this.setUserState(ctx.from.id, 'consultarBoleto');
    });
  }

  async consultarBoletoTexto() {
    this.bot.on('text', async (ctx) => {
      const userState = this.getUserState(ctx.from.id);
      if (userState === 'consultarBoleto') {
        const respuesta = await this.consultarLotenet(ctx.message.text);
        await ctx.reply(respuesta);
        this.setUserState(ctx.from.id, undefined);
      }
    });
  }

  async consultarLotenet(serial: string): Promise<string> {
    const respuesta = await this.lotenetService.consultarBoleto({
      id_boleto: serial,
    });
    return respuesta.status.message;
  }

  async init() {
    this.cmd_start();
    this.consultarBoletoComando();
    this.consultarBoletoTexto();
  }
}
