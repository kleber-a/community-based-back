import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { FilterPeopleDto } from './dto/filter-people.dto';
import { Prisma } from '@prisma/client';

import * as XLSX from 'xlsx';


interface PessoaExcel {
  ID_Eleitor?: number;
  Nome: string;
  CPF?: number | string;
  Data_Nascimento?: number | string;
  Telefone?: number | string;
  Sexo?: string;
  Endereco?: string;
  Numero?: number | string;
  Bairro?: string;
  Cidade?: string;
  UF?: string;
  CEP?: number | string;
  Comunidade?: string;
  Categoria?: string;
  'ID Categorias'?: string;
}
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

  // async importarPlanilha(
  //   arquivo: Express.Multer.File
  // ) {

  //   const workbook = XLSX.read(
  //     arquivo.buffer,
  //     {
  //       type: 'buffer'
  //     }
  //   );


  //   const primeiraAba = workbook.Sheets[
  //     workbook.SheetNames[0]
  //   ];


  //   const pessoas = XLSX.utils.sheet_to_json(
  //     primeiraAba
  //   );


  //   for (const pessoa of pessoas as any[]) {

  //     await this.prisma.people.create({

  //       data: {
  //         nome: pessoa.nome,
  //         cpf: String(pessoa.cpf),
  //         telefone: String(pessoa.telefone),
  //         bairro: pessoa.bairro,
  //         cidade: pessoa.cidade,
  //         uf: pessoa.uf
  //       }

  //     });

  //   }


  //   return {
  //     mensagem: 'Importação realizada',
  //     total: pessoas.length
  //   };

  // }

  // async importarPlanilha(
  //   arquivo: Express.Multer.File
  // ) {

  //   const workbook = XLSX.read(
  //     arquivo.buffer,
  //     {
  //       type: 'buffer'
  //     }
  //   );


  //   const segundaAba = workbook.Sheets[
  //     workbook.SheetNames[1]
  //   ];


  //   // const dados = XLSX.utils.sheet_to_json(
  //   //   segundaAba
  //   // );


  //   // console.log(dados);


  //   // return dados;


  //   const pessoasExcel = XLSX.utils.sheet_to_json<PessoaExcel>(segundaAba);


  //   console.log('pessoalExcel', pessoasExcel);

  //   const pessoas = pessoasExcel.map((pessoa) => ({
  //     nome: pessoa.Nome,
  //     cpf: pessoa.CPF ? String(pessoa.CPF).padStart(11, '0') : null,
  //     telefone: pessoa.Telefone ? String(pessoa.Telefone) : null,
  //     endereco: pessoa.Endereco,
  //     numero: pessoa.Numero ? String(pessoa.Numero) : null,
  //     bairro: pessoa.Bairro,
  //     cidade: pessoa.Cidade,
  //     uf: pessoa.UF,
  //     cep: pessoa.CEP ? String(pessoa.CEP).padStart(8, '0') : null,
  //     dataNascimento: pessoa.Data_Nascimento
  //       ? new Date(
  //         Math.round(
  //           (Number(pessoa.Data_Nascimento) - 25569) * 86400 * 1000
  //         )
  //       ).toISOString()
  //       : null,
  //     sexo: pessoa.Sexo,
  //     categoriasIds: pessoa['ID Categorias']
  //       ? pessoa['ID Categorias'].split(',').map((id) => id.trim())
  //       : [],

  //   }));

  //   await this.prisma.people.createMany({
  //     data: pessoas,
  //     skipDuplicates: true, // pula CPF duplicado se houver índice único
  //   });

  //   return {
  //     mensagem: 'Importação realizada com sucesso.',
  //     total: pessoas.length,
  //   };

  // }

  // async importarPlanilha(
  //   arquivo: Express.Multer.File
  // ) {

  //   const workbook = XLSX.read(
  //     arquivo.buffer,
  //     {
  //       type: 'buffer'
  //     }
  //   );


  //   const segundaAba = workbook.Sheets[
  //     workbook.SheetNames[1]
  //   ];


  //   // const dados = XLSX.utils.sheet_to_json(
  //   //   segundaAba
  //   // );


  //   // console.log(dados);


  //   // return dados;


  //   const pessoasExcel = XLSX.utils.sheet_to_json<PessoaExcel>(segundaAba);


  //   for (const pessoa of pessoasExcel) {
  //     const categorias = pessoa['ID Categorias']
  //       ? pessoa['ID Categorias']
  //         .split(',')
  //         .map((c) => c.trim())
  //       : [];

  //     const nomesCategorias = pessoa['ID Categorias']
  //       ? pessoa['ID Categorias']
  //         .split(',')
  //         .map((c) => c.trim())
  //         .filter(Boolean)
  //       : [];

  //     const categoriasConectadas: { id: string }[] = [];

  //     for (const nomeCategoria of nomesCategorias) {
  //       let categoria = await this.prisma.category.findUnique({
  //         where: {
  //           nome: nomeCategoria,
  //         },
  //       });

  //       if (!categoria) {
  //         categoria = await this.prisma.category.create({
  //           data: {
  //             nome: nomeCategoria,
  //           },
  //         });
  //       }

  //       categoriasConectadas.push({
  //         id: categoria.id,
  //       });
  //     }

  //     try {
  //       await this.prisma.people.create({
  //         data: {
  //           nome: pessoa.Nome,
  //           cpf: String(pessoa.CPF).padStart(11, '0'),
  //           dataNascimento: this.converterData(pessoa.Data_Nascimento),
  //           telefone: pessoa.Telefone
  //             ? String(pessoa.Telefone)
  //             : null,
  //           endereco: pessoa.Endereco,
  //           bairro: pessoa.Bairro,
  //           cidade: pessoa.Cidade,
  //           uf: pessoa.UF,
  //           // cep: pessoa.CEP
  //           //   ? String(pessoa.CEP).padStart(8, '0')
  //           //   : null,
  //           cep: pessoa.CEP
  //             ? String(pessoa.CEP).replace(/\D/g, '').padStart(8, '0')
  //             : null,

  //           categorias: {
  //             connect: categoriasConectadas,
  //           },
  //         },
  //       });


  //       console.log('Teste', {
  //         nome: pessoa.Nome.length,
  //         cpf: String(pessoa.CPF).length,
  //         telefone: pessoa.Telefone ? String(pessoa.Telefone).length : 0,
  //         uf: pessoa.UF?.length,
  //         cep: pessoa.CEP ? String(pessoa.CEP).replace(/\D/g, '').length : 0,
  //       });



  //     } catch (e) {
  //       console.log('Erro ao importar:', pessoa);
  //       throw e;
  //     }
  //   }


  //   return {
  //     mensagem: 'Importação realizada com sucesso.',
  //     total: pessoasExcel.length,
  //   };

  // }

  // private converterData(data?: number | string): Date | null {
  //   if (!data) return null;

  //   if (typeof data === 'number') {
  //     return new Date((data - 25569) * 86400 * 1000);
  //   }

  //   const [dia, mes, ano] = data.split('/');

  //   return new Date(Number(ano), Number(mes) - 1, Number(dia));
  // }


  async importarPlanilha(arquivo: Express.Multer.File) {
    const workbook = XLSX.read(arquivo.buffer, {
      type: 'buffer',
    });

    const segundaAba = workbook.Sheets[workbook.SheetNames[1]];

    const pessoasExcel = XLSX.utils.sheet_to_json<PessoaExcel>(segundaAba);

    /*
     * 1 - Cria todas as categorias da planilha
     */

    const categoriasUnicas = [
      ...new Set(
        pessoasExcel
          .flatMap((pessoa) =>
            pessoa['ID Categorias']
              ? pessoa['ID Categorias']
                .split(',')
                .map((c) => c.trim())
                .filter(Boolean)
              : [],
          ),
      ),
    ];

    for (const nome of categoriasUnicas) {
      const existe = await this.prisma.category.findUnique({
        where: { nome },
      });

      if (!existe) {
        await this.prisma.category.create({
          data: {
            nome,
          },
        });
      }
    }

    /*
     * 2 - Busca todas as categorias já cadastradas
     */

    const categoriasBanco = await this.prisma.category.findMany();

    const mapaCategorias = new Map(
      categoriasBanco.map((categoria) => [
        categoria.nome,
        categoria.id,
      ]),
    );

    /*
     * 3 - Importa as pessoas
     */

    let importadas = 0;
    let ignoradas = 0;

    for (const pessoa of pessoasExcel) {
      const cpf = pessoa.CPF
        ? String(pessoa.CPF).padStart(11, '0')
        : '';

      if (!cpf) {
        ignoradas++;
        continue;
      }

      const pessoaExiste = await this.prisma.people.findUnique({
        where: {
          cpf,
        },
      });

      if (pessoaExiste) {
        ignoradas++;
        continue;
      }

      const categoriasPessoa = pessoa['ID Categorias']
        ? pessoa['ID Categorias']
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean)
        : [];

      const categoriasConnect = categoriasPessoa
        .map((nome) => mapaCategorias.get(nome))
        .filter((id): id is string => !!id)
        .map((id) => ({ id }));

      await this.prisma.people.create({
        data: {
          nome: pessoa.Nome,
          cpf,
          dataNascimento: this.converterData(
            pessoa.Data_Nascimento,
          ),
          telefone: pessoa.Telefone
            ? String(pessoa.Telefone)
            : null,
          endereco: pessoa.Endereco,
          pontoReferencia: null,
          bairro: pessoa.Bairro,
          cidade: pessoa.Cidade,
          uf: pessoa.UF,
          cep: pessoa.CEP
            ? String(pessoa.CEP)
              .replace(/\D/g, '')
              .padStart(8, '0')
            : null,
          comunidade: pessoa.Comunidade,

          categorias: {
            connect: categoriasConnect,
          },
        },
      });

      importadas++;
    }

    return {
      mensagem: 'Importação concluída.',
      importadas,
      ignoradas,
      categoriasCriadas: categoriasUnicas.length,
    };
  }


  private converterData(
    data?: number | string,
  ): Date | null {
    if (!data) {
      return null;
    }

    if (typeof data === 'number') {
      return new Date((data - 25569) * 86400 * 1000);
    }

    const partes = data.split('/');

    if (partes.length !== 3) {
      return null;
    }

    const [dia, mes, ano] = partes;

    return new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia),
    );
  }


}