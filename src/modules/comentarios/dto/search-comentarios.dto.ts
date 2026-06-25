import { IsOptional } from "class-validator";

export class SearchComentariosDto{
    @IsOptional()
    comentario?:string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number
}