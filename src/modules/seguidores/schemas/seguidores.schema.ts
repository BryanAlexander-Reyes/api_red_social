import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeguidorDocument = Seguidor & Document;

// coleccion de seguidores

@Schema({
    timestamps: {
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_modificacion',
    },
})
export class Seguidor {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    seguidor_id!: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    seguido_id!: Types.ObjectId;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const SeguidorSchema = SchemaFactory.createForClass(Seguidor);
