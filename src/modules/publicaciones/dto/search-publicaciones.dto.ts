import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class SearchPublicacionesDto{
    @ApiPropertyOptional({
            example: 'tu publicacion',
            description:'Publicacion'
        })
    @IsOptional()
    contenido?:string;
    
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