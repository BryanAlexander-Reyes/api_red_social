import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import{ Document, Types } from 'mongoose'


export type ComentariosDocument= Comentarios & Document;

// colleccion de publicaciones 

@Schema({
    timestamps:true
})
export class Comentarios{
    @Prop({
        requeried: true,
    })
    comentario!: string;

    @Prop({
        required:true,
        tipe: Types.ObjectId,
        ref:'Publicacion',
    })
    publicacion_id!: Types.ObjectId

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref:'User',
    })
    user_id!: Types.ObjectId
    @Prop({
        default:true,
    })
    activo!: boolean;
    
}
export const ComentariosSchema = SchemaFactory.createForClass(Comentarios);