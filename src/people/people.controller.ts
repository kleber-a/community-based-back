import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FilterPeopleDto } from './dto/filter-people.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Post(':id/categories')
  addCategorias(@Param('id') id: string, @Body() addCategoriasDto: { categoriasIds: string[] }) {
    return this.peopleService.addCategorias(id, addCategoriasDto.categoriasIds);
  }

  @Get()
  findAll(@Query() filter: FilterPeopleDto) {
    return this.peopleService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }

  @Delete(':id/categories/:categoriaId')
  removeCategoria(
    @Param('id') pessoaId: string,
    @Param('categoriaId') categoriaId: string,
  ) {
    return this.peopleService.removeCategoria(
      pessoaId,
      categoriaId,
    );
  }

  // @Post('importar')
  // @UseInterceptors(FileInterceptor('arquivo'))
  // importar(
  //   @UploadedFile() arquivo: Express.Multer.File,
  // ) {

  //   return this.peopleService.importarPlanilha(arquivo);

  // }

  @Post('importar')
  @UseInterceptors(FileInterceptor('arquivo'))
  importar(
    @UploadedFile() arquivo: Express.Multer.File,
  ) {
    console.log('Arquivo recebido:', arquivo); // Log para verificar o arquivo recebido
    return this.peopleService.importarPlanilha(arquivo);

  }

}