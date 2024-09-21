import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  codeByMessage(code: number): string {
    if (code === 100) return this.messageByArr(this.messBoletoGanador);
    if (code === 101) return this.messageByArr(this.messBoletoNoGandor);
    if (code === 102) return this.messageByArr(this.messBoletoActivo);
    if (code === 103) return this.messageByArr(this.messBoletoCaducado);
    if (code === 106) return this.messageByArr(this.messBoletoNoExite);
    if (code === 107 || code === 105) {
      return this.messageByArr(this.messBoletoPagado);
    }

    return '¡Lo sentimos, ha ocurrido un error inesperado en la consulta. 😕 Por favor, inténtalo nuevamente presionando /consultar. Si el problema persiste, puedes intentarlo más tarde. ¡Gracias por tu comprensión!';
  }

  messageByArr(messagesArr: string[]) {
    // Generar un índice aleatorio
    const randomIndex = Math.floor(Math.random() * messagesArr.length);

    // Devolver el elemento correspondiente al índice aleatorio
    return messagesArr[randomIndex];
  }

  private messBoletoGanador = [
    '¡Felicidades, afortunado! 🌟 ¡Has ganado! 🎉 \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Increíble, Ganaste! 🍀💰 ¡La suerte siempre sonríe a los jugadores constantes!',
    '¡Ganador confirmado! 🌈 🎫 \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Bravo! 🎊 ¡Eres un ganador! 💸\n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Increíble, has ganado! 🎁 \n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Ganaste! 🌟 🚀\n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Enhorabuena! 🏆 ¡Ganaste el premio! 💰 \n\nRecuerde llevar su ticket ganador al punto de cobro para validar su premio.',
    '¡Increíble, eres un ganador! 🎉 \n\nRecuerde llevar su ticket ganador al punto de cobro para validar su premio.',
    '¡Ganador confirmado! 🎈 \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Brillante! 💎 ¡Eres un ganador! 🌈 \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
  ];

  private messBoletoNoGandor = [
    '¡Oh, no fue un boleto ganador! 🌌 ¡La próxima vez puede ser tu momento de ganar aun más!',
    '¡No hay premio esta vez! 🍀🚀 ¡Sigue jugando y mucha suerte!',
    '¡Oh no, este boleto no es ganador! 🎗️ Pero cada intento es una inversión en tu propia suerte',
    '¡Otro intento sin suerte! 🌧️ Pero, ¿has considerado que cada boleto es una experiencia única? 💡 ¡Sigue jugando!',
    '¡Hoy no fue tu día de suerte! 🌅 Pero la buena noticia es que puedes jugara para el proximo sorteo.',
    '¡No ganaste esta vez, pero la diversión no se detiene! 🎭 Cada boleto es una nueva historia, ¡Sigue jugando!',
    '¡No hay premio en esta ocasión! 🚫 ¡La próxima vez puede ser tu momento de ganar aun más!',
    '¡Ups, sin premio esta vez! 🎭 🎢 ¡Sigue jugando, te deseo toda la suerte!',
    '¡No fue el boleto ganador! 🎫 💪 ¡Sigue participando y haz que cada boleto cuente!',
  ];

  private messBoletoActivo = [
    '🌟 Tu boleto está activo. Ahora solo queda esperar a que salgan los resultados.🚀\n\n ¡Buena suerte en el sorteo!',
    '¡Tu boleto está activo! 🚀 Está a la espera de los resultados.🚀\n\n ¡Esperemos que la suerte esté de tu lado! 🍀',
    '¡Tu boleto está a la espera de los resultados!🚀\n\n ¡Buena suerte y que tu boleto sea el ganador!',
    '¡Enhorabuena! 🎫 Tu boleto está activo.🚀\n\n Solo queda aguardar a los resultados con optimismo.',
    '🎉 Tu boleto está activo y ala espera de los resultados del sorteo.🚀\n\n ¡Espera pacientemente el sorteo!',
    '¡Tu boleto está a la espera de los resultados! 🚀\n\n ¡Buena suerte!',
    ' 🌌 Tu boleto está esperando los resultados del sorteo.🚀\n\n  ¡Mucha suerte en esta ocasión!',
    ' 🚀 Tu boleto está en espera de los resultados.🚀\n\n  ¡Mucha suerte en esta ocasión!',
    '¡Tu boleto está activo y listo para los resultados del sorteo! 🚀\n\n  ¡Mucha suerte en esta ocasión!',
    '🎭 Tu boleto está activo. 🚀\n\n  ¡Mucha suerte en esta ocasión!',
  ];

  private messBoletoNoExite = [
    '¡Ups! Parece que el serial del boleto ingresado no es válido. 😅 No te preocupes, los errores suceden.',
    '¡Oh no! Parece que hubo un pequeño error en el serial del boleto. 😕',
    '¡Error de serial del boleto! 🚫😅 No te preocupes, los errores suceden.',
    'Parece que ha habido un pequeño error con el serial del boleto ingresado. 😬',
    'Serial del boleto no válido. 😟 😅 No te preocupes, los errores suceden.',
    'El serial del boleto ingresado no coincide con nuestros registros. 🤔',
  ];

  private messBoletoCaducado = [
    '¡Oh no! Parece que tu boleto ganador ha caducado después de 30 días sin reclamación. 😔 Siempre hay nuevas oportunidades, ¡así que sigue participando y quizás la próxima vez será la indicada!',
    'Tu boleto ganador ha caducado después de 30 días. 😢 No te preocupes, ¡la suerte siempre da otra vuelta! Sigue jugando para más oportunidades emocionantes.',
    'Lo siento, pero tu boleto ganador ha caducado después de 30 días sin reclamación. 🕰️ ¡No te desanimes! Con cada nuevo boleto, se abre la puerta a nuevas posibilidades.',
    'Desafortunadamente, tu boleto ganador ha caducado. 😞 Pero recuerda, cada boleto es una nueva aventura. ¡Sigue jugando para más momentos emocionantes!',
    'Tu boleto ha caducado después de 30 días sin ser reclamado. 😕 ¡No te preocupes! Siempre hay más premios esperándote, así que sigue participando con entusiasmo.',
    'Lo sentimos, pero tu boleto ganador ha expirado. 😟 No pierdas la esperanza, ¡sigue jugando y descubre nuevas oportunidades de ganar!',
    'Tu boleto ganador ha caducado después de 30 días. 😢 No te preocupes, ¡hay muchos más sorteos por delante! Sigue participando y espera con emoción tu próximo premio.',
    'Después de 30 días, tu boleto ganador ha caducado. 😔 Pero no te preocupes, ¡siempre hay más premios por descubrir! ¡Sigue jugando con optimismo',
    'Lamentablemente, tu boleto ha caducado después de 30 días sin ser reclamado. 😞 Pero cada boleto nuevo es una nueva oportunidad. ¡Sigue participando y sueña en grande!',
    'Tu boleto ha caducado, pero no te desanimes. 😟 Siempre hay más sorteos y más premios esperándote. ¡Sigue jugando y buscando esa gran victoria!',
  ];

  private messBoletoPagado = [
    '¡Enhorabuena! 🎉 Tu boleto ha sido pagado con éxito. ¡Disfruta de tus ganancias y gracias por jugar con nosotros!',
    '¡Felicidades! 💸 Tu premio ha sido procesado y tu boleto está oficialmente pagado. ¡Que lo disfrutes al máximo!',
    '¡Excelentes noticias! 🌟 Tu boleto ha sido verificado y el pago se ha realizado con éxito. ¡Esperamos que disfrutes de tu merecido premio!',
    '¡Confirmado! 💰 Tu premio ha sido entregado y tu boleto ha sido pagado. ¡Gracias por participar y sigue jugando con nosotros!',
    '¡Pago completado! 🎁 Tu boleto ha sido procesado y tu premio está listo para ser disfrutado. ¡Felicidades!',
    '¡Bien hecho! 🏆 Tu boleto ha sido pagado y tu premio está listo para ser tuyo. ¡Gracias por ser parte de nuestra comunidad de ganadores!',
    '¡Ganador confirmado! 💳 Tu boleto ha sido pagado y tu premio está en camino. ¡Que lo disfrutes al máximo!',
    '¡Éxito! 🎊 Tu boleto ha sido verificado y el pago ha sido realizado. ¡Disfruta de tus ganancias y gracias por jugar!',
    '¡Gran noticia! 💲 Tu boleto ha sido oficialmente pagado. ¡Esperamos que disfrutes de tus ganancias y sigas participando en futuros sorteos!',
    '¡Pago exitoso! 🌈 Tu premio ha sido transferido con éxito. ¡Disfruta de tu victoria y gracias por ser parte de nuestra comunidad ganadora!',
  ];
}
