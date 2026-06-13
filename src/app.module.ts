// // import { Module } from '@nestjs/common';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';
// // import { PeopleController } from './modules/people/people.controller';
// // import { PeopleModule } from './modules/people/people.module';

// // @Module({
// //   imports: [PeopleModule],
// //   controllers: [AppController, PeopleController],
// //   providers: [AppService],
// // })
// // export class AppModule {}


// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// import { PeopleModule } from './modules/people/people.module';
// import { DemandsModule } from './modules/demands/demands.module';

// import { People } from './modules/people/entities/people.entity';
// import { Demands } from './modules/demands/entities/demands.entity';

// @Module({
//   imports: [
//     // 1. Configuração para ler o arquivo .env
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     // DATABASE_URL="postgresql://postgres:Vv@!11212121212@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

//     // 2. Inicialização do Banco de Dados (PostgreSQL)
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST', 'localhost'),
//         port: configService.get<number>('DB_PORT', 5432),
//         username: configService.get<string>('DB_USERNAME', 'postgres'),
//         password: configService.get<string>('DB_PASSWORD', 'sua_senha'), // ajuste com sua senha
//         database: configService.get<string>('DB_NAME', 'seu_banco'),    // ajuste com o nome do seu banco
//         entities: [People, Demands],
//         synchronize: true, // Gera as tabelas automaticamente (use apenas em dev)
//       }),
//     }),

//     // 3. Importação dos seus módulos de negócio
//     PeopleModule,
//     DemandsModule,
//   ],
//   controllers: [AppController], // 👈 Removido o PeopleController daqui! Ele entra via PeopleModule.
//   providers: [AppService],
// })
// export class AppModule {}


// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module'; // Módulo do Prisma que criamos
import { PeopleModule } from './modules/people/people.module';
import { DemandsModule } from './modules/demands/demands.module';

@Module({
  imports: [
    // 1. O PrismaModule resolve a conexão global com o Supabase usando o .env de forma automática
    PrismaModule,

    // 2. Seus módulos de negócio
    PeopleModule,
    DemandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}