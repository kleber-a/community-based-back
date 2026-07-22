import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FilterPeopleDto } from './dto/filter-people.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeopleService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPersonDto: CreatePersonDto) {


    const { categoriasIds, ...data } = createPersonDto;

    const prismaData = {
      ...data,
      ...(categoriasIds?.length
        ? {
          categorias: {
            connect: categoriasIds.map((id) => ({
              id,
            })),
          },
        }
        : {}),
    };

    // console.log('Dados enviados para Prisma:', prismaData);

    // return {
    //   mensagem: 'Dados recebidos',
    //   dados: createPersonDto,
    // };

    return this.prisma.people.create({
      data: prismaData,
    });
  }

  async findAll(filter: FilterPeopleDto) {
    const {
      page,
      limit,
      nome,
      cpf,
      telefone,
      bairro,
      cidade,
      comunidade,
      categoriaId,
      orderBy,
      order,
    } = filter;

    const where: Prisma.PeopleWhereInput = {
      AND: [
        nome
          ? {
            nome: {
              contains: nome,
              mode: 'insensitive',
            },
          }
          : {},

        cpf
          ? {
            cpf: {
              contains: cpf,
            },
          }
          : {},

        telefone
          ? {
            telefone: {
              contains: telefone,
            },
          }
          : {},

        bairro
          ? {
            bairro: {
              contains: bairro,
              mode: 'insensitive',
            },
          }
          : {},

        cidade
          ? {
            cidade: {
              contains: cidade,
              mode: 'insensitive',
            },
          }
          : {},

        comunidade
          ? {
            comunidade: {
              contains: comunidade,
              mode: 'insensitive',
            },
          }
          : {},

        categoriaId
          ? {
            categorias: {
              some: {
                id: categoriaId,
              },
            },
          }
          : {},
      ],
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.people.findMany({
        where,
        include: {
          categorias: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
      }),

      this.prisma.people.count({
        where,
      }),
    ]);

    return {
      data: items,

      meta: {
        page,
        limit,
        total,

        totalPages: Math.ceil(total / limit),

        hasNext: page < Math.ceil(total / limit),

        hasPrevious: page > 1,
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.people.findUnique({
      where: {
        id,
      },
      include: {
        categorias: true,
      },
    });
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    return this.prisma.people.update({
      where: {
        id,
      },
      data: updatePersonDto,
    });
  }

  async remove(id: string) {
    return this.prisma.people.delete({
      where: {
        id,
      },
    });
  }


  async addCategorias(
    pessoaId: string,
    categoriasIds: string[],
  ) {
    return this.prisma.people.update({
      where: {
        id: pessoaId,
      },
      data: {
        categorias: {
          connect: categoriasIds.map(id => ({ id })),
        },
      },
      include: {
        categorias: true,
      },
    });
  }

  async removeCategoria(
    pessoaId: string,
    categoriaId: string,
  ) {
    return this.prisma.people.update({
      where: {
        id: pessoaId,
      },
      data: {
        categorias: {
          disconnect: {
            id: categoriaId,
          },
        },
      },
      include: {
        categorias: true,
      },
    });
  }

}