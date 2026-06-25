import { MongooseModule } from '@nestjs/mongoose';
import { Seguidor, SeguidorSchema } from './schemas/seguidores.schema';
import { Module } from '@nestjs/common';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';

@Module({
    controllers: [SeguidoresController],
    providers: [SeguidoresService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Seguidor.name,
                schema: SeguidorSchema,
            },
        ]),
    ],
})
export class SeguidoresModule {}
