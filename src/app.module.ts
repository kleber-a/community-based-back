import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [PrismaModule, PeopleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
