import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import{ Document, Types} from 'mongoose';
import mongoose from 'mongoose';


export type PublicacionDocument= Publicacion & Document;

// colleccion de publicaciones 

@Schema({
    timestamps:true
})
export class Publicacion{
    @Prop({
        required: true,
    })
    contenido!: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    })
    user_id!: Types.ObjectId
    @Prop({
        default:true,
    })
    activo!: boolean;
    
}
export const PublicacionesSchema = SchemaFactory.createForClass(Publicacion);