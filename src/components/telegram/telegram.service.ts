import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Update } from '@telegraf/types';
import { config } from 'src/config/config';
import { Context, Telegraf } from 'telegraf';
//import { message } from 'telegraf/filters';
import { LotenetService } from '../lotenet/lotenet.service';
import { MessageService } from './message.service';

@Injectable()
export class TelegramService {
  private bot: Telegraf<Context<Update>>;
  private userstate = {};

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly lotenetService: LotenetService,
    private readonly messageService: MessageService,
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
        `Hola ${name}, ¡Bienvenido! 🌟 Soy tu asistente de boletos. Para consultar el estado de tu boleto, simplemente presiona /consultarBoleto. Estoy aquí para ayudarte. 😊
        `,
      );
    });
  }

  async consultarBoletoComando() {
    this.bot.command('consultarBoleto', async (ctx) => {
      await ctx.reply(
        '¡Genial! Para continuar, por favor, proporciona el serial del boleto ganador. 🎫',
      );
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
    const message = await this.messageService.codeByMessage(respuesta.code);
    return message;
  }

  async init() {
    this.cmd_start();
    this.consultarBoletoComando();
    this.consultarBoletoTexto();
  }
}
