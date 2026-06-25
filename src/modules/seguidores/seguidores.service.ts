import { Injectable, NotFoundException } from '@nestjs/common';
import { Seguidor, SeguidorDocument } from './schemas/seguidores.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSeguidorDto } from './dto/create-seguidores.dto';
import { UpdateSeguidorDto } from './dto/update-seguidores.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Injectable()
export class SeguidoresService {
    constructor(
        @InjectModel(Seguidor.name)
        private SeguidoresModel: Model<SeguidorDocument>,
    ) {}

    // metodo para crear seguidores y verificar
    async create(dto: CreateSeguidorDto) {
        const seguidor = await this.SeguidoresModel.create({
            seguidor_id: new Types.ObjectId(dto.seguidor_id),
            seguido_id: new Types.ObjectId(dto.seguido_id),
        });

        return ResponseHelper.success(seguidor, 201);
    }

    // metodo para consultar seguidores
    async findAll() {
        const seguidores = await this.SeguidoresModel
            .find({ activo: true })
            .populate('seguidor_id', '-password')
            .populate('seguido_id', '-password')
            .sort({ fecha_creacion: -1 })
            .lean();

        const data = seguidores.map((seguidor: any) => ({
            ...seguidor,
        }));

        return ResponseHelper.success(data);
    }

    // consultas de seguidores eliminados logicamente
    async findInactive() {
    const seguidores = await this.SeguidoresModel
        .find({ activo: false })
        .populate('seguidor_id', '-password')
        .populate('seguido_id', '-password')
        .sort({ fecha_modificacion: -1 })
        .lean();

    return ResponseHelper.success(seguidores);
    }

    async findOne(id: string) {
    const seguidor = await this.SeguidoresModel
        .findById(id)
        .populate('seguidor_id', '-password')
        .populate('seguido_id', '-password');

    if (!seguidor) {
        throw new NotFoundException('Seguidor no encontrado');
    }
    return ResponseHelper.success(seguidor);
}

    // actualizar un seguidor
    async update(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.SeguidoresModel.findById(id);
        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }
        const updateSeguidor = await this.SeguidoresModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updateSeguidor);
    }

    // actualizacion parcial
    async partialUpdate(id: string, dto: UpdateSeguidorDto) {
        const seguidor = await this.SeguidoresModel.findById(id);
        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }
        const updateSeguidor = await this.SeguidoresModel.findByIdAndUpdate(id, dto, { new: true });
        return ResponseHelper.success(updateSeguidor);
    }

    // eliminacion logica
    async remove(id: string) {
        const seguidor = await this.SeguidoresModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }

        const deleteSeguidor = await this.SeguidoresModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.success(deleteSeguidor);
    }

    // restaurar eliminacion
    async restore(id: string) {
        const seguidor = await this.SeguidoresModel.findById(id);

        if (!seguidor) {
            throw new NotFoundException('Seguidor no encontrado');
        }
        const restoreSeguidor = await this.SeguidoresModel.findByIdAndUpdate(
            id,
            { activo: true },
            { new: true },
        );
        return ResponseHelper.success(restoreSeguidor);
    }
}
