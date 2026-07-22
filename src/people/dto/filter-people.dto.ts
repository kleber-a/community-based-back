import {
    IsIn,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class FilterPeopleDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit = 10;

    @IsOptional()
    @IsString()
    nome?: string;

    @IsOptional()
    @IsString()
    cpf?: string;

    @IsOptional()
    @IsString()
    telefone?: string;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
    cidade?: string;

    @IsOptional()
    @IsString()
    comunidade?: string;

    @IsOptional()
    @IsString()
    categoriaId?: string;

    @IsOptional()
    @IsIn([
        'nome',
        'cpf',
        'bairro',
        'cidade',
        'criadoEm',
        'comunidade',
    ])
    orderBy: Prisma.PeopleScalarFieldEnum = 'nome';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order: Prisma.SortOrder = 'asc';
}