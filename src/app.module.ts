import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PeopleModule } from './people/people.module';
import { DemandStreetModule } from './demand-street/demand-street.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, PeopleModule, CategoryModule, DemandStreetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
