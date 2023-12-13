import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LotenetService } from './lotenet.service';
import { CreateLotenetDto } from './dto/create-lotenet.dto';
import { UpdateLotenetDto } from './dto/update-lotenet.dto';

@Controller('lotenet')
export class LotenetController {
  constructor(private readonly lotenetService: LotenetService) {}

  @Post()
  create(@Body() createLotenetDto: CreateLotenetDto) {
    return this.lotenetService.create(createLotenetDto);
  }

  @Get()
  findAll() {
    return this.lotenetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lotenetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLotenetDto: UpdateLotenetDto) {
    return this.lotenetService.update(+id, updateLotenetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lotenetService.remove(+id);
  }
}
