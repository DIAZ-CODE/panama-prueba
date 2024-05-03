import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoAdapter = require('@bot-whatsapp/database/mongo');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRPortalWeb = require('@bot-whatsapp/portal');

const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@bot-whatsapp/bot');
import { message } from './message';
import { LotenetService } from '../lotenet/lotenet.service';
import { MessageService } from '../lotenet/message.service';
import { config } from 'src/config/config';

@Injectable()
export class BotWhatService {
  constructor(
    private readonly lotenetService: LotenetService,
    private readonly messageService: MessageService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  public consultarBoletoFLow = addKeyword(['1']).addAnswer(
    '📄 Escriba el serial del boleto',
    { capture: true },
    async (ctx, { state, flowDynamic, fallBack }) => {
      const serial = ctx.body;
      if (serial.length < 8) {
        return fallBack('Serial invalido, profavor revise');
      }
      const resp = await this.consultarLotenet(serial);
      await flowDynamic(resp);
      await state.update({ nombre: ctx.body });
    },
  );

  public flujoDeSaludarFlow = addKeyword(EVENTS.WELCOME).addAnswer(
    message,
    null,
    null,
  );

  public initFlow = createFlow([this.flujoDeSaludarFlow]);

  async consultarLotenet(serial: string): Promise<string> {
    const respuesta = await this.lotenetService.consultarBoleto({
      id_boleto: serial,
    });
    console.log(respuesta);
    const message = await this.messageService.codeByMessage(respuesta.code);
    return message;
  }

  public init = async () => {
    const adapterDB = new MongoAdapter({
      dbUri: this.configService.MONGO_URI,
      dbName: this.configService.MONGO_DB_NAME,
    });

    const adapterProvider = createProvider(BaileysProvider);
    createBot({
      flow: this.initFlow,
      provider: adapterProvider,
      database: adapterDB,
    });
    QRPortalWeb();
  };
}
