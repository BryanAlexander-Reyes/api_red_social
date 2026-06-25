import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchReaccionesDto {

    @ApiPropertyOptional({
        example: 'like',
        description: 'Tipo de reacción'
    })
    @IsOptional()
    tipo_reaccion?: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Página'
    })
    @IsOptional()
    page?: number;

    @ApiPropertyOptional({
        example: 10,
        description: 'Cantidad de registros'
    })
    @IsOptional()
    limit?: number;
}