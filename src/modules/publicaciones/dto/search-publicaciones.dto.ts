import { IsOptional } from 'class-validator';

export class SearchPublicacionesDto{
    @IsOptional()
    contenido?:string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number
}