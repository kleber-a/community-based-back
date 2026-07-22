import { IsArray, IsUUID } from 'class-validator';

export class AddSolicitantesDto {
    @IsArray()
    @IsUUID('4', { each: true })
    pessoasIds!: string[];
}