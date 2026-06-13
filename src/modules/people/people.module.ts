// import { Module } from '@nestjs/common';
// import { PeopleService } from './people.service';

// @Module({
//   providers: [PeopleService]
// })
// export class PeopleModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';

@Module({
  imports: [TypeOrmModule.forFeature([People])],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [TypeOrmModule], // Exporta para permitir que outros módulos usem o repositório de People
})
export class PeopleModule {}