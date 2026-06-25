import { IsOptional } from "class-validator";

export class SearchReaccionesDto{
    @IsOptional()
    tipo_reaccion?:string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number
}