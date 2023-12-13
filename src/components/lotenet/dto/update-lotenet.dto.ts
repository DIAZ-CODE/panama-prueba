import { PartialType } from '@nestjs/mapped-types';
import { CreateLotenetDto } from './create-lotenet.dto';

export class UpdateLotenetDto extends PartialType(CreateLotenetDto) {}
