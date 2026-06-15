import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  // @Get()
  // findAll() {
  //   return this.peopleService.findAll();
  // }
  // @Get()
  // findAll(
  //   @Query('page') page = '1',
  //   @Query('limit') limit = '10',
  // ) {
  //   return this.peopleService.findAll(
  //     Number(page),
  //     Number(limit),
  //   );
  // }
  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('name') nome?: string,
    @Query('cpf') cpf?: string,
  ) {
    return this.peopleService.findAll(
      Number(page),
      Number(limit),
      nome,
      cpf,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.peopleService.removeAll();
  }
}
