// import { Body, Controller, Post } from '@nestjs/common';
// import { PeopleDto } from './dto/people.dto';

// @Controller('people')
// export class PeopleController {

//     @Post()
//     create(@Body() people: PeopleDto) {
//         console.log('people', people); 
//         return 'This action adds a new person';
//     }

// }

import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPeopleDto: CreatePeopleDto) {
    return this.peopleService.create(createPeopleDto);
  }

  @Get()
  findAll() {
    return console.log('findAll called');
  }

//   @Get()
//   findAll() {
//     return this.peopleService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseUUIDPipe) id: string) {
//     return this.peopleService.findOne(id);
//   }
}