// src/modules/demands/dto/create-demands.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, Length } from 'class-validator';
import { StatusDemanda } from '../entities/demands.entity';

export class CreateDemandsDto {
  @IsString()
  @IsNotEmpty()
  nomeDemands!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(StatusDemanda)
  @IsOptional()
  status?: StatusDemanda;

  @IsString()
  @IsOptional()
  rua?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  cidade?: string;

  @IsString()
  @Length(2, 2)
  @IsOptional()
  uf?: string;

  @IsString()
  @IsOptional()
  icone?: string;

  @IsUUID()
  @IsOptional()
  pessoaId?: string; // ID da pessoa vinculada (opcional)
}