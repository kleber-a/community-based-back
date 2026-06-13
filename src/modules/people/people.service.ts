// src/modules/people/people.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from './entities/people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async create(createPeopleDto: CreatePeopleDto): Promise<People> {
    const cpfExists = await this.peopleRepository.findOne({ where: { cpf: createPeopleDto.cpf } });
    if (cpfExists) {
      throw new ConflictException('Já existe uma pessoa cadastrada com este CPF.');
    }

    const newPerson = this.peopleRepository.create(createPeopleDto);
    return await this.peopleRepository.save(newPerson);
  }

//   async findAll(): Promise<People[]> {
//     return await this.peopleRepository.find({ relations: ['demandas'] });
//   }

//   async findOne(id: string): Promise<People> {
//     const person = await this.peopleRepository.findOne({ 
//       where: { id }, 
//       relations: ['demandas'] 
//     });
    
//     if (!person) {
//       throw new NotFoundException('Pessoa não encontrada.');
//     }
//     return person;
//   }
}