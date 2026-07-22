import {
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    IsUUID,
} from 'class-validator';
import { StatusDemanda } from '@prisma/client';

export class CreateDemandStreetDto {
    @IsString()
    @MaxLength(150)
    titulo!: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsEnum(StatusDemanda)
    status?: StatusDemanda;

    @IsOptional()
    @IsString()
    rua?: string;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
    cidade?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2)
    uf?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    fotos?: string[];

    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    pessoasIds?: string[];
}