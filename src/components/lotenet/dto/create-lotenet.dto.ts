import { IsNotEmpty, IsString } from 'class-validator';

export class QueryBoletoDto {
  @IsString()
  @IsNotEmpty()
  readonly id_boleto: string;
}

export class Respuesta {
  readonly code: number;
  readonly status: BoletoInfo;
  readonly error: boolean;
}

export class BoletoInfo {
  readonly monto_ganador: number;
  readonly message: string;
}
