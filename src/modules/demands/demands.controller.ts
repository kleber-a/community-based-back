import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemandsDto } from './dto/create-demands.dto';

@Controller('demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Post()
  create(@Body() createDemandsDto: CreateDemandsDto) {
    return this.demandsService.create(createDemandsDto);
  }

//   @Get()
//   findAll() {
//     return this.demandsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseUUIDPipe) id: string) {
//     return this.demandsService.findOne(id);
//   }
}