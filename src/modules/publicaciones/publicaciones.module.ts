import {MongooseModule } from "@nestjs/mongoose";
import { Publicacion, PublicacionesSchema} from "./schemas/publicaciones.eschema";
import { Module } from "@nestjs/common";
import { PublicacionesController } from "./publicaciones.controller";
import { PublicacionesService } from "./publicaciones.service";

@Module({
    controllers:[PublicacionesController],
    providers: [ PublicacionesService],
    imports :[
    MongooseModule.forFeature([
        {
            name: Publicacion.name,
            schema: PublicacionesSchema
        },
        
    ]),
]
})

export class PublicacionesModule {}
