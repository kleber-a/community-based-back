import { Injectable } from '@nestjs/common';
import { CreateDemandStreetDto } from './dto/create-demand-street.dto';
import { UpdateDemandStreetDto } from './dto/update-demand-street.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DemandStreetService {

  constructor(private prisma: PrismaService) { }

  // create(createDemandStreetDto: CreateDemandStreetDto) {
  //   return this.prisma.demandStreet.create({
  //     data: createDemandStreetDto,
  //   });
  // }

  async create(createDemandStreetDto: CreateDemandStreetDto) {
    const { pessoasIds, ...data } = createDemandStreetDto;

    return this.prisma.demandStreet.create({
      data: {
        ...data,

        ...(pessoasIds?.length
          ? {
            solicitantes: {
              create: pessoasIds.map((pessoaId) => ({
                pessoa: {
                  connect: {
                    id: pessoaId,
                  },
                },
              })),
            },
          }
          : {}),
      },

      include: {
        solicitantes: {
          include: {
            pessoa: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.demandStreet.findMany({
      include: {
        solicitantes: {
          include: {
            pessoa: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.demandStreet.findUnique({
      where: { id },
      include: {
        solicitantes: {
          include: {
            pessoa: true,
          },
        },
      },
    });
  }

  update(id: string, updateDemandStreetDto: UpdateDemandStreetDto) {
    return this.prisma.demandStreet.update({
      where: { id },
      data: updateDemandStreetDto,
    });
  }

  remove(id: string) {
    return this.prisma.demandStreet.delete({
      where: { id },
    });
  }


  async addSolicitantes(id: string, pessoasIds: string[]) {
    return this.prisma.pessoaDemandaRua.createMany({
      data: pessoasIds.map((pessoaId) => ({
        pessoaId,
        demandaId: id,
      })),
      skipDuplicates: true,
    });
  }

  async removeSolicitante(
    demandaId: string,
    pessoaId: string,
  ) {
    return this.prisma.pessoaDemandaRua.delete({
      where: {
        pessoaId_demandaId: {
          pessoaId,
          demandaId,
        },
      },
    });
  }

}
