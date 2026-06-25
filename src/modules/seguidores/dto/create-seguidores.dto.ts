import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// export se declara para que se pueda utilizar en otras partes del archivo
export class CreateSeguidorDto {
    @ApiProperty({
        description: 'Id del usuario que sigue',
    })
    @IsNotEmpty()
    @IsMongoId()
    seguidor_id!: string;

    @ApiProperty({
        description: 'Id del usuario que es seguido',
    })
    @IsNotEmpty()
    @IsMongoId()
    seguido_id!: string;
}
