import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demands } from './entities/demands.entity';
import { CreateDemandsDto } from './dto/create-demands.dto';
import { People } from '../people/entities/people.entity';

@Injectable()
export class DemandsService {
  constructor(
    @InjectRepository(Demands)
    private readonly demandsRepository: Repository<Demands>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async create(createDemandsDto: CreateDemandsDto): Promise<Demands> {
    const { pessoaId, ...dadosDemands } = createDemandsDto;
    
    const demanda = this.demandsRepository.create(dadosDemands);

    if (pessoaId) {
      const person = await this.peopleRepository.findOne({ where: { id: pessoaId } });
      if (!person) {
        throw new NotFoundException('A pessoa informada para esta demanda não existe.');
      }
      demanda.pessoa = person;
    }

    return await this.demandsRepository.save(demanda);
  }

//   async findAll(): Promise<Demands[]> {
//     return await this.demandsRepository.find({ relations: ['pessoa'] });
//   }

//   async findOne(id: string): Promise<Demands> {
//     const demanda = await this.demandsRepository.findOne({ 
//       where: { id }, 
//       relations: ['pessoa'] 
//     });

//     if (!demanda) {
//       throw new NotFoundException('Demanda não encontrada.');
//     }
//     return demanda;
//   }
}