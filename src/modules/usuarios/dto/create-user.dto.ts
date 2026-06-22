import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// export se declara para que se pueda utilizar en otras partes del archivo
export class CreateUserDto{
    @ApiProperty({
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength:50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{message: 'El nombre debe de tener minimo 3 caracteres'})
    @MaxLength(50,{message:'El nombre no puede superar 50 caracteres'})
    nombre!:string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100, {message:'El correo no puede superar 100 caracteres'})
    correo!:string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        minLength:8,
        maxLength:20
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{message:'La contraseña debe tener 8 caracteres'})
    @MaxLength(20,{message:'La contraseña no puede superar los 20 caracteres'})
    password!: string;

    @ApiProperty()
    @IsNotEmpty()
    rol_id!: string

}