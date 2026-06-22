// para validadar si es string o no 
import { 
    IsNotEmpty,
    IsString,
 } from "class-validator";
// para 
import {
    ApiProperty,
} from '@nestjs/swagger';

export class CreateRoleDto{
    @ApiProperty({
        example: 'Administrador'
    })

    @IsString()
    @IsNotEmpty()
    nombre: string;
}