import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  async codeByMessage(code: number): Promise<string> {
    if (code === 100) return await this.messageByArr(this.messBoletoGanador);
    if (code === 101) return await this.messageByArr(this.messBoletoNoGandor);
    if (code === 102) return await this.messageByArr(this.messBoletoActivo);
    if (code === 103) return await this.messageByArr(this.messBoletoCaducado);
    if (code === 106) return await this.messageByArr(this.messBoletoNoExite);
    if (code === 107 || code === 105) {
      return await this.messageByArr(this.messBoletoPagado);
    }

    return '¡Lo sentimos, ha ocurrido un error inesperado en la consulta. 😕 Por favor, inténtalo nuevamente presionando /consultar. Si el problema persiste, puedes intentarlo más tarde. ¡Gracias por tu comprensión!';
  }

  async messageByArr(messagesArr: string[]) {
    // Generar un índice aleatorio
    const randomIndex = Math.floor(Math.random() * messagesArr.length);

    // Devolver el elemento correspondiente al índice aleatorio
    return messagesArr[randomIndex];
  }

  private messBoletoGanador = [
    '¡Felicidades, afortunado! 🌟 ¡Has ganado! 🎉 Pero, ¿te imaginas cuánto más podrías ganar la próxima vez? ¡Sigue participando y duplica tu suerte!\n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Increíble! 🍀 Ganaste en grande. 💰 ¿Te has preguntado qué otro premio te aguarda? ¡La suerte siempre sonríe a los jugadores constantes! \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Ganador confirmado! 🌈 Pero aquí está el truco: cada boleto es una nueva oportunidad. 🎫 \n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Bravo! 🎊 ¡Eres un afortunado ganador! 💸\n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Increíble, has ganado! 🎁 Pero, ¿te imaginas lo que podría suceder en tu próximo intento? ¡Sigue jugando y descúbrelo!\n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Ganaste! 🌟 Pero la verdadera pregunta es: ¿cuánto más puedes ganar? 🚀 ¡Sigue participando y descubre nuevas oportunidades!\n\nPara proceder al cobro, asegúrese de tener en su mano el boleto ganador.',
    '¡Enhorabuena! 🏆 ¡Ganaste el premio! 💰 ¿Te animas a ver qué más te depara el destino? ¡Sigue jugando y descúbrelo!\n\nRecuerde llevar su ticket ganador al punto de cobro para validar su premio.',
    '¡Increíble, eres un ganador! 🎉 ¡No te detengas aquí, la suerte te espera!\n\nRecuerde llevar su ticket ganador al punto de cobro para validar su premio.',
    '¡Ganador confirmado! 🎈 Pero la verdadera magia está en lo que viene después. 🌟 ¡Sigue jugando y descubre nuevas emociones!\n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
    '¡Brillante! 💎 ¡Eres un ganador! 🌈 Pero, ¿te gustaría experimentar aún más emociones y premios? ¡La diversión acaba de comenzar!\n\nNo olvide mostrar su boleto ganador al momento de reclamar su premio.',
  ];

  private messBoletoNoGandor = [
    '¡Oh, no fue un boleto ganador! 🌌 Pero cada boleto es una nueva oportunidad. 💫 ¡La próxima vez puede ser tu momento de ganar aun más!',
    '¡No hay premio esta vez! 🍀 Pero recuerda, cada boleto es un paso más cerca de la victoria. 🚀 ¡Sigue jugando y mucha suerte!',
    '¡Oh no, este boleto no es ganador! 🎗️ Pero cada intento es una inversión en tu propia suerte. 💰 ¡Más boletos, más oportunidades!',
    '¡A veces no ganamos, pero eso no nos detiene! 🌈 Piensa en esto como una experiencia que te acerca al próximo premio. 🏆 ¡Sigue intentándolo!',
    '¡Otro intento sin suerte! 🌧️ Pero, ¿has considerado que cada boleto es una experiencia única? 💡 ¡Sigue jugando!',
    '¡Hoy no fue tu día de suerte! 🌅 Pero la buena noticia es que puedes jugara para el proximo sorteo. 🌟 ¡No te desanimes, sigue adelante',
    '¡No ganaste esta vez, pero la diversión no se detiene! 🎭 Cada boleto es una nueva historia, y la tuya aún tiene capítulos emocionantes. 📖 ¡Sigue jugando!',
    '¡No hay premio en esta ocasión! 🚫 ¡La próxima vez puede ser tu momento de ganar aun más!',
    '¡Ups, sin premio esta vez! 🎭 Pero, ¿quién dijo que la emoción se acaba aquí? 🎢 ¡Sigue jugando, te deseo toda la suerte!',
    '¡No fue el boleto ganador! 🎫 Pero la perseverancia es la clave del éxito. 💪 ¡Sigue participando y haz que cada boleto cuente!',
  ];

  private messBoletoActivo = [
    '¡Excelente elección! 🌟 Tu boleto está activo. Ahora solo queda esperar a que salgan los resultados. ¡Buena suerte en el sorteo!',
    '¡Tu boleto está en camino hacia la victoria! 🚀 Está activo y listo para los resultados del sorteo. ¡Esperemos que la suerte esté de tu lado! 🍀',
    '¡Tu boleto está a la espera de los resultados! 🌈 Ahora toca esperar con emoción. ¡Buena suerte y que tu boleto sea el ganador!',
    '¡Enhorabuena! 🎫 Tu boleto está activo. Solo queda aguardar a los resultados con optimismo. ¡Que la suerte te acompañe en este sorteo!',
    '¡Emoción en marcha! 🎉 Tu boleto está activo y ala espera de los resultados del sorteo. ¡Espera pacientemente y que la fortuna te sonría en el sorteo!',
    '¡Tu boleto está a la espera de los resultados! 🏆 La emoción está en el aire. Ahora toca esperar y desear que tu boleto sea el ganador. ¡Buena suerte!',
    '¡Gran elección! 🌌 Tu boleto está esperando los resultados del sorteo. ¡Esperemos juntos el resultado y que tengas mucha suerte en esta ocasión!',
    '¡Aventura activada! 🚀 Tu boleto está en espera de los resultados. ¡Mantente en vilo y que la suerte te acompañe en este emocionante sorteo!',
    '¡Tu boleto está activo y listo para los resultados del sorteo! 🎊 Ahora, solo queda esperar con entusiasmo los resultados. ¡Mucha suerte y que tu boleto sea el ganador!',
    '¡Prepárate para la emoción! 🎭 Tu boleto está activo. ¡Esperemos con ansias los resultados y que la suerte esté de tu lado en este sorteo!',
  ];

  private messBoletoNoExite = [
    '¡Ups! Parece que el serial del boleto ingresado no es válido. 😅 No te preocupes, los errores suceden. Si deseas volver a intentarlo, simplemente utiliza /consultar.',
    '¡Oh no! Parece que hubo un pequeño desliz en el serial del boleto. 😕 ¡No te preocupes! Puedes volver a intentarlo ingresando /consultar.',
    '¡Error de serial del boleto! 🚫 No te desanimes. Si quieres volver a intentar, simplemente utiliza /consultar y corriges el serial.',
    'Parece que ha habido un pequeño error con el serial del boleto ingresado. 😬 ¡No pasa nada! Puedes rectificarlo y probar nuevamente con /consultar.',
    'Serial del boleto no válido. 😟 No te preocupes, es fácil corregirlo. ¡Solo ingresa /consultar y vuelve a intentarlo!',
    'El serial del boleto ingresado no coincide con nuestros registros. 🤔 ¡No te preocupes! Si quieres hacer otra consulta, simplemente utiliza /consultar.',
    'Parece que hubo un error con el serial proporcionado. 😓 ¡No pasa nada! Para intentar nuevamente, solo utiliza /consultar y verifica el serial.',
    '¡Algo salió mal con el serial del boleto! 😩 Pero no te preocupes, puedes corregirlo fácilmente con /consultar y volver a intentarlo.',
    'Serial del boleto no reconocido. 🧐 ¡No te preocupes! Si deseas volver a consultar, simplemente utiliza /consultar y realiza la corrección necesaria.',
    'Parece que ha habido un pequeño malentendido con el serial del boleto. 😣 ¡Sin problemas! Puedes rectificar ingresando /consultar y volver a intentarlo.',
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
