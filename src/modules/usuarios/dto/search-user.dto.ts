import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchUserDto{
    @ApiPropertyOptional({
        example: 'nombre',
        description:'nombre'
    })
    @IsOptional()
    nombre?:string;

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