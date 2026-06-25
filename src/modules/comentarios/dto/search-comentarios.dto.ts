import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class SearchComentariosDto{
    @ApiPropertyOptional({
        example: 'tu comentario'
    })
    @IsOptional()
    comentario?:string;
    @ApiPropertyOptional({
        example: 1,
        description:'página'
    })
    @IsOptional()
    page?: number;
    @ApiPropertyOptional({
        example: 10,
        description:'cantidad de registros'
    })
    @IsOptional()
    limit?: number
}