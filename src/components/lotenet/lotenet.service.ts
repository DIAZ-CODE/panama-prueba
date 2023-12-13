import { Injectable } from '@nestjs/common';
import { CreateLotenetDto } from './dto/create-lotenet.dto';
import { UpdateLotenetDto } from './dto/update-lotenet.dto';

@Injectable()
export class LotenetService {
  create(createLotenetDto: CreateLotenetDto) {
    return 'This action adds a new lotenet';
  }

  findAll() {
    return `This action returns all lotenet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lotenet`;
  }

  update(id: number, updateLotenetDto: UpdateLotenetDto) {
    return `This action updates a #${id} lotenet`;
  }

  remove(id: number) {
    return `This action removes a #${id} lotenet`;
  }
}
