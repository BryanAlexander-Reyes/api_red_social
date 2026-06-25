import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import{ Document, Types } from 'mongoose'


export type ReaccionDocument= Reaccion & Document;

// colleccion de publicaciones 

@Schema({
    timestamps:true
})
export class Reaccion{
    @Prop({
        requeried: true,
    })
    tipo_reaccion!: string;

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
export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);