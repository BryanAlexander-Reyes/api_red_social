import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import{ Document, Types } from 'mongoose'


export type PublicacionDocument= Publicacion & Document;

// colleccion de publicaciones 

@Schema({
    timestamps:true
})
export class Publicacion{
    @Prop({
        requeried: true,
    })
    contenido!: string;

    @Prop({
        tipe: Types.ObjectId,
        ref:'User',
    })
    user_id!: Types.ObjectId
    @Prop({
        default:true,
    })
    activo!: boolean;
    
}
export const PublicacionesSchema = SchemaFactory.createForClass(Publicacion);