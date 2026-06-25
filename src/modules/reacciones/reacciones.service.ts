import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { ReaccionDocument, Reaccion } from './schemas/reacciones.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReaccionDto } from './dto/create-reacciones.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateReaccionDto } from './dto/update-reacciones.dto';
import { SearchReaccionesDto } from './dto/search-reacciones.dto';
import { filter } from 'rxjs';


@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reaccion.name)
        private ReaccionesModel:
        Model<ReaccionDocument>
    ){}
    // METODO PARA CREAR PUBLICACIONES Y VERIFICAR

    async create(dto: CreateReaccionDto) {

  const Reaccion = await this.ReaccionesModel.create({
    tipo_reaccion: dto.tipo_reaccion,
    publicacion_id: new Types.ObjectId(dto.Publicacion_id),
    user_id: new Types.ObjectId(dto.User_id),
  });

  return ResponseHelper.success(Reaccion, 201);
}
    // metodo para consultar publicaciones
    async findAll(search: SearchReaccionesDto) {
        const filter: any= {activo:true,};
        if (search.tipo_reaccion){
            filter.tipo_reaccion={
                $regex: search.tipo_reaccion,
                $options: 'i',
            };
        }
        // paginacion
        const page =Number(search.page) ||1;
        const limit = Number(search.limit) ||10;
        // consulta
    const reacciones = await this.ReaccionesModel
      .find(filter)
      .populate('user_id', '-password')
      .populate('publicacion_id','contenido')
      .sort({ createdAt: -1 })
      .skip((page -1) * limit)
      .limit(limit)
      .lean();

        const total =await this.ReaccionesModel.countDocuments(filter);

    return ResponseHelper.success({total, page, limit, data:reacciones});
  }

    // consultas de publicaciones eliminadas logicamente

    async findInactive() {
    const reacciones = await this.ReaccionesModel
        .find({ activo: false })
        .populate('user_id', '-password')
        .populate('publicacion_id', 'contenido')
        .sort({ fecha_modificacion: -1 })
        .lean();

    return ResponseHelper.success(reacciones);
    }

    async findOne(id: string) {
    const reaccion = await this.ReaccionesModel
        .findById(id)
        .populate('user_id', '-password')
        .populate('publicacion_id', 'contenido')
        .sort({ fecha_modificacion: -1 })
        .lean();

    if (!reaccion) {
        throw new NotFoundException('Reacción no encontrada');
    }
    return ResponseHelper.success(reaccion);
    }

    // actualizar una publicacion 

    async update(id:string, dto: UpdateReaccionDto){
        const reacciones= await this.ReaccionesModel.findById(id);
        if(!reacciones){
            throw new NotFoundException('Rol no encontrado');
        }
        const updateReacciones=await this.ReaccionesModel.findByIdAndUpdate(id, dto, {new:true});
        return ResponseHelper.success(updateReacciones);
    }

    // actualizacion parcial

    async partialUpdate(id:string, dto:UpdateReaccionDto){
        const reacciones=await this.ReaccionesModel.findById(id);
        if(!reacciones){
            throw new NotFoundException('rol no encontrado')
        }
        const deleteReacciones= await this.ReaccionesModel.findByIdAndUpdate(id,{activo:false,},{new:false});
        return ResponseHelper.success(deleteReacciones);
    }
    // eliminaicion logica 
    async remove(id:string){
        const role = await this.ReaccionesModel.findById(id);

        if (!role){
            throw new NotFoundException('Rol no encontrado')
        }

        const deleteRole=await this.ReaccionesModel.findByIdAndUpdate(id,{activo: false,},{new:true});

        return ResponseHelper.success(deleteRole);
    }

    // restaurar eliminacion
    async restore(id:string){
        const reacciones= await this.ReaccionesModel.findById(id)

        if (!reacciones){
            throw new NotFoundException('Rol no encontrado')
        }
        const restoreReacciones= await this.ReaccionesModel.findByIdAndUpdate(id, {activo:true,},{new:true});
        return ResponseHelper.success(restoreReacciones);
    }
}

