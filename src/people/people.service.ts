import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeopleService {

  constructor(private prisma: PrismaService) { }

  // create(createPersonDto: CreatePersonDto) {
  //   // return 'This action adds a new person';
  //   return this.prisma.people.create({
  //     data: {
  //       nome: createPersonDto.nome,
  //       cpf: createPersonDto.cpf,
  //       dataNascimento: createPersonDto.dataNascimento,
  //       endereco: createPersonDto.endereco,
  //       telefone: createPersonDto.telefone,
  //       bairro: createPersonDto.bairro,
  //       cidade: createPersonDto.cidade,
  //       uf: createPersonDto.uf,
  //       cep: createPersonDto.cep,
  //     },
  //   });
  // }

  async create(createPersonDto: CreatePersonDto) {
    return this.prisma.people.create({
      data: {
        ...createPersonDto,
        dataNascimento: createPersonDto.dataNascimento
          ? new Date(createPersonDto.dataNascimento)
          : undefined,
      },
    });
  }

  // findAll() {
  //   // return `This action returns all people`;
  //   return this.prisma.people.findMany();
  // }

  // async findAll(page = 1, limit = 10) {
  //   const skip = (page - 1) * limit;

  //   const [data, total] = await Promise.all([
  //     this.prisma.people.findMany({
  //       skip,
  //       take: limit,
  //       orderBy: {
  //         criadoEm: 'desc',
  //       },
  //     }),
  //     this.prisma.people.count(),
  //   ]);

  //   return {
  //     data,
  //     meta: {
  //       total,
  //       page,
  //       limit,
  //       totalPages: Math.ceil(total / limit),
  //     },
  //   };
  // }


  async findAll(
    page = 1,
    limit = 10,
    nome?: string,
    cpf?: string,
  ) {
    const skip = (page - 1) * limit;

    const where = {
      ...(nome && {
        nome: {
          contains: nome,
          mode: 'insensitive' as const,
        },
      }),
      ...(cpf && {
        cpf: {
          contains: cpf,
        },
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.people.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          criadoEm: 'desc',
        },
      }),
      this.prisma.people.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: string) {
    // return `This action returns a #${id} person`;
    return this.prisma.people.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    // return `This action updates a #${id} person`;
    return this.prisma.people.update({
      where: { id: id },
      data: {
        // name: updatePersonDto.name,
        // email: updatePersonDto.email,
        // phone: updatePersonDto.phone,
      },
    });
  }

  remove(id: string) {
    // return `This action removes a #${id} person`;
    return this.prisma.people.delete({
      where: { id: id },
    });
  }

  async removeAll() {
    const result = await this.prisma.people.deleteMany();

    return {
      message: 'Pessoas removidas com sucesso',
      totalRemovidos: result.count,
    };
  }
}
