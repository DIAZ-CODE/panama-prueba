import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Update } from '@telegraf/types';
import { config } from 'src/config/config';
import { Context, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { LotenetService } from '../lotenet/lotenet.service';
import { MessageService } from '../lotenet/message.service';

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

  //private mensaje_de_bienvenida = `
  //¡Bienvenido! 🌟 Soy tu asistente de boletos. Para consultar el estado de tu boleto, simplemente presiona /consultar estoy aquí para ayudarte. 😊
  //\nEste servicio es sólo para su orientación y entretenimiento, de ninguna forma representa un compromiso de pago y/o garantía de cobro de premios.
  //\nEl contenido de este chat no es vinculante con los resultados oficiales del sorteo, usted debe presentar el ticket en las oficinas correspondientes, en buenas condiciones y antes de caducar, para que pueda ser procesado como ganador.
  //\nNo se pagarán premios :
  //  - Sin presentar ticket
  //  - Si el Ticket está deteriorado
  //  - Si el Ticket ha caducado
  //  - Si el ticket ha sido alterado de cualquier forma
  //`;

  //Este es el comando de Start, que es para suscribir los users
  async cmd_start() {
    this.bot.start(async (ctx) => {
      //const name = String(ctx.from.first_name);
      //const message = this.mensaje_de_bienvenida;
      //ctx.reply(message);
    });
  }

  async consultarBoletoComando() {
    this.bot.command('consultar', async (ctx) => {
      await ctx.reply(
        '¡Genial! Para continuar, por favor, proporciona el serial del boleto. 🎫',
      );
      this.setUserState(ctx.from.id, 'consultarBoleto');
    });
  }

  async consultarBoletoTexto() {
    this.bot.on(message('text'), async (ctx) => {
      const userState = this.getUserState(ctx.from.id);
      if (userState === 'consultarBoleto') {
        const respuesta = await this.consultarLotenet(ctx.message.text);
        await ctx.reply(respuesta);
        this.setUserState(ctx.from.id, undefined);
      } else {
        await ctx.reply(
          '¡Hola! 🌟 Gracias por contactarnos. Para consultar el estado de tu boleto, simplemente presiona /consultar \n\n¡Te deseamos mucha suerte en el juego y esperamos que sigas participando para vivir más emociones! 🎉',
        );
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
    //this.consultarBoletoComando();
    //this.consultarBoletoTexto();
  }
}
