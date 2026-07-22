import {
    IsDateString,
    IsOptional,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';

export class CreatePersonDto {
    @IsString()
    @MaxLength(150)
    nome!: string;

    @IsString()
    @Length(11, 11)
    cpf!: string;

    @IsOptional()
    @IsDateString()
    dataNascimento?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    endereco?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telefone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    pontoReferencia?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    bairro?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    cidade?: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    uf?: string;

    @IsOptional()
    @IsString()
    @Length(8, 8)
    cep?: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    comunidade?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    localVotacao?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    tituloEleitor?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    zona?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    secao?: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    coordenador?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    facebook?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    instagram?: string;

    @IsOptional()
    @IsString()
    obs?: string;

    @IsOptional()
    @IsString({ each: true })
    categoriasIds?: string[];
}