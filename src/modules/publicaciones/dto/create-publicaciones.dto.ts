import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreatePublicacionesDto{
    @ApiProperty({
        description: 'Descripción de la Publicaciones',
        maxLength: 500,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500,{message:'la publicacion no puede superar 500 carácteres'})
    contenido!:string;

    @ApiProperty()
    @IsNotEmpty()
    user_id!:string
}