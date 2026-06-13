import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demands } from './entities/demands.entity';
import { People } from '../people/entities/people.entity';
import { DemandsService } from './demands.service';
import { DemandsController } from './demands.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Demands, People])], // Importa ambos os repositórios aqui
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}