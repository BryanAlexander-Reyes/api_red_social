import {IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// export se declara para que se pueda utilizar en otras partes del archivo
export class CreateReaccionDto{
    @ApiProperty({
        description: 'Tipo de reaccion',
        maxLength:50,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50,{message:'El nombre no puede superar 50 caracteres'})
    tipo_reaccion!:string;

    @ApiProperty()
    @IsNotEmpty()
    Publicacion_id!: string

    @ApiProperty()
    @IsNotEmpty()
    User_id!: string

}