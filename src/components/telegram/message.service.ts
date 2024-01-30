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

    return '¡Lo sentimos, ha ocurrido un error inesperado en la consulta. 😕 Por favor, inténtalo nuevamente presionando /consultarBoleto. Si el problema persiste, puedes intentarlo más tarde. ¡Gracias por tu comprensión!';
  }

  async messageByArr(messagesArr: string[]) {
    // Generar un índice aleatorio
    const randomIndex = Math.floor(Math.random() * messagesArr.length);

    // Devolver el elemento correspondiente al índice aleatorio
    return messagesArr[randomIndex];
  }

  private messBoletoGanador = [
    '¡Felicidades, afortunado! 🌟 ¡Has ganado! 🎉 Pero, ¿te imaginas cuánto más podrías ganar la próxima vez? ¡Sigue participando y duplica tu suerte!',
    '¡Increíble! 🍀 Ganaste en grande. 💰 ¿Te has preguntado qué otro premio te aguarda? ¡La suerte siempre sonríe a los jugadores constantes!',
    '¡Ganador confirmado! 🌈 Pero aquí está el truco: cada boleto es una nueva oportunidad. 🎫 ¿Listo para más emociones y premios?',
    '¡Bravo! 🎊 ¡Eres un afortunado ganador! 💸 Pero, ¿y si te dijera que este es solo el principio? ¡Hay más premios esperándote!',
    '¡Increíble, has ganado! 🎁 Pero, ¿te imaginas lo que podría suceder en tu próximo intento? ¡Sigue jugando y descúbrelo!',
    '¡Ganaste! 🌟 Pero la verdadera pregunta es: ¿cuánto más puedes ganar? 🚀 ¡Sigue participando y descubre nuevas oportunidades!',
    '¡Enhorabuena! 🏆 ¡Ganaste el premio! 💰 ¿Te animas a ver qué más te depara el destino? ¡Sigue jugando y descúbrelo!',
    '¡Increíble, eres un ganador! 🎉 Pero, ¿y si te digo que hay más premios por descubrir? ¡No te detengas aquí, la suerte te espera!',
    '¡Ganador confirmado! 🎈 Pero la verdadera magia está en lo que viene después. 🌟 ¡Sigue jugando y descubre nuevas emociones!',
    '¡Brillante! 💎 ¡Eres un ganador! 🌈 Pero, ¿te gustaría experimentar aún más emociones y premios? ¡La diversión acaba de comenzar!',
  ];

  private messBoletoNoGandor = [
    '¡Oh, no fue esta vez! 🌌 Pero cada boleto es una nueva oportunidad. 💫 ¡La próxima vez puede ser tu momento de brillar aún más!',
    '¡No hay premio esta vez! 🍀 Pero recuerda, cada boleto es un paso más cerca de la victoria. 🚀 ¡Sigue jugando y construye tu propia suerte!',
    '¡No te preocupes, no fue el ganador! 🎗️ Pero cada intento es una inversión en tu propia suerte. 💰 ¡Más boletos, más oportunidades!',
    '¡A veces no ganamos, pero eso no nos detiene! 🌈 Piensa en esto como una experiencia que te acerca al próximo premio. 🏆 ¡Sigue intentándolo!',
    '¡Otro intento sin suerte! 🌧️ Pero, ¿has considerado que cada boleto es una experiencia única? 💡 ¡Sigue jugando y descubre lo que viene!',
    '¡Hoy no fue tu día de suerte! 🌅 Pero la buena noticia es que mañana es una nueva oportunidad. 🌟 ¡No te desanimes, sigue adelante',
    '¡No ganaste esta vez, pero la diversión no se detiene! 🎭 Cada boleto es una nueva historia, y la tuya aún tiene capítulos emocionantes. 📖 ¡Sigue jugando!',
    '¡No hay premio en esta ocasión! 🚫 Pero piensa en esto como una paleta de sabores, ¡cada boleto es diferente! 🍭 ¡No dejes de probar!',
    '¡Ups, sin premio esta vez! 🎭 Pero, ¿quién dijo que la emoción se acaba aquí? 🎢 ¡Sigue jugando y crea tu propia montaña rusa de emociones!',
    '¡No fue el boleto ganador! 🎫 Pero la perseverancia es la clave del éxito. 💪 ¡Sigue participando y haz que cada boleto cuente!',
  ];

  private messBoletoActivo = [
    '¡Tu boleto está en juego! 🌟 ¡Cuantos más participes, más oportunidades tienes de ganar! 🎉 ¡Sigue así y mantente atento a los resultados!',
    '¡Estás en la carrera por la suerte! 🚀 Cada boleto es una nueva posibilidad de éxito. 🌈 ¡Sigue jugando y espera con entusiasmo los resultados!',
    '¡Tu boleto está activo y la emoción está en el aire! 🎫 Cuantas más veces juegues, más cerca estarás de la victoria. 💪 ¡Buena suerte en tu camino!',
    '¡Estás en camino hacia la victoria! 🏆 Cuantos más boletos tengas, más oportunidades se abren para ti. 🍀 ¡Sigue jugando y esperando con expectación!',
    '¡Tu boleto está listo para sorprenderte! 🎭 No pierdas la oportunidad de aumentar tus posibilidades con cada participación. 🎰 ¡Buena suerte en el sorteo!',
    '¡Estás a punto de descubrir tu destino! 🌌 Cuantas más veces juegues, más posibilidades tendrás de ver tu boleto ganador. 🌟 ¡Sigue jugando con emoción!',
    '¡La suerte está de tu lado! 🍀 Pero recuerda, la perseverancia es clave. 🔑 ¡Mientras más juegas, más cerca estás de alcanzar el premio! 🏅',
    '¡Tu boleto tiene el potencial de ser el ganador! 🌠 Cuantas más veces juegues, más emocionantes serán tus posibilidades. 🚀 ¡Sigue participando con entusiasmo!',
    '¡Tu boleto está en juego y el suspense es emocionante! 🎭 Cuantas más oportunidades tengas, mayores serán tus posibilidades de ganar. 🌈 ¡Buena suerte!',
    '¡Estás a solo un paso de la victoria! 🎉 Cada boleto es una nueva oportunidad de triunfar. 💫 ¡Sigue jugando y espera con optimismo los resultados!',
  ];

  private messBoletoNoExite = [
    '¡Ups! Parece que el serial ingresado no es válido. 😅 No te preocupes, los errores suceden. Si deseas volver a intentarlo, simplemente utiliza /consultarBoleto.',
    '¡Oh no! Parece que hubo un pequeño desliz en el serial. 😕 ¡No te preocupes! Puedes volver a intentarlo ingresando /consultarBoleto.',
    '¡Error de serial! 🚫 No te desanimes. Si quieres volver a intentar, simplemente utiliza /consultarBoleto y corriges el serial.',
    'Parece que ha habido un pequeño error con el serial ingresado. 😬 ¡No pasa nada! Puedes rectificarlo y probar nuevamente con /consultarBoleto.',
    'Serial no válido. 😟 No te preocupes, es fácil corregirlo. ¡Solo ingresa /consultarBoleto y vuelve a intentarlo!',
    'El serial ingresado no coincide con nuestros registros. 🤔 ¡No te preocupes! Si quieres hacer otra consulta, simplemente utiliza /consultarBoleto.',
    'Parece que hubo un error con el serial proporcionado. 😓 ¡No pasa nada! Para intentar nuevamente, solo utiliza /consultarBoleto y verifica el serial.',
    '¡Algo salió mal con el serial! 😩 Pero no te preocupes, puedes corregirlo fácilmente con /consultarBoleto y volver a intentarlo.',
    'Serial no reconocido. 🧐 ¡No te preocupes! Si deseas volver a consultar, simplemente utiliza /consultarBoleto y realiza la corrección necesaria.',
    'Parece que ha habido un pequeño malentendido con el serial. 😣 ¡Sin problemas! Puedes rectificar ingresando /consultarBoleto y volver a intentarlo.',
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
