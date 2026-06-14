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
    endereco?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telefone?: string;

    @IsOptional()
    @IsString()
    pontoReferencia?: string;

    @IsOptional()
    @IsString()
    bairro?: string;

    @IsOptional()
    @IsString()
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
    comunidade?: string;

    @IsOptional()
    @IsString()
    localVotacao?: string;

    @IsOptional()
    @IsString()
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
    coordenador?: string;

    @IsOptional()
    @IsString()
    facebook?: string;

    @IsOptional()
    @IsString()
    instagram?: string;

    @IsOptional()
    @IsString()
    obs?: string;

    @IsOptional()
    @IsString()
    atividades?: string;
}
