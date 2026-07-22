import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DemandStreetService } from './demand-street.service';
import { CreateDemandStreetDto } from './dto/create-demand-street.dto';
import { UpdateDemandStreetDto } from './dto/update-demand-street.dto';
import { AddSolicitantesDto } from './dto/add-solicitantes.dto';

@Controller('demand-street')
export class DemandStreetController {
  constructor(private readonly demandStreetService: DemandStreetService) { }

  @Post()
  create(@Body() createDemandStreetDto: CreateDemandStreetDto) {
    return this.demandStreetService.create(createDemandStreetDto);
  }

  @Get()
  findAll() {
    return this.demandStreetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.demandStreetService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDemandStreetDto: UpdateDemandStreetDto,
  ) {
    return this.demandStreetService.update(id, updateDemandStreetDto);
  }

  @Patch(':id/solicitantes')
  addSolicitantes(
    @Param('id') id: string,
    @Body() dto: AddSolicitantesDto,
  ) {
    return this.demandStreetService.addSolicitantes(
      id,
      dto.pessoasIds,
    );
  }

  @Delete(':id/solicitantes/:pessoaId')
  removeSolicitante(
    @Param('id') demandaId: string,
    @Param('pessoaId') pessoaId: string,
  ) {
    return this.demandStreetService.removeSolicitante(
      demandaId,
      pessoaId,
    );
  }


  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.demandStreetService.remove(id);
  }
}
