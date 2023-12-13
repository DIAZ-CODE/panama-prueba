import { IsNotEmpty, IsString } from 'class-validator';

export class QueryBoletoDto {
  @IsString()
  @IsNotEmpty()
  readonly id_boleto: string;
}

export class BoletoInfo {
  readonly status: string;

  readonly monto_ganador: number;

  readonly serial: number;
}
