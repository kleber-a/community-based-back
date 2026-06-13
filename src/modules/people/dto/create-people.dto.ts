// src/modules/people/dto/create-people.dto.ts
import { IsString, IsNotEmpty, IsOptional, Length, IsDateString } from 'class-validator';

export class CreatePeopleDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  cpf!: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  pontoReferencia?: string;

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
  cep?: string;

  @IsString()
  @IsOptional()
  comunidade?: string;

  @IsString()
  @IsOptional()
  localVotacao?: string;

  @IsString()
  @IsOptional()
  tituloEleitor?: string;

  @IsString()
  @IsOptional()
  zona?: string;

  @IsString()
  @IsOptional()
  secao?: string;

  @IsString()
  @IsOptional()
  coordenador?: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  obs?: string;

  @IsString()
  @IsOptional()
  atividades?: string;
}