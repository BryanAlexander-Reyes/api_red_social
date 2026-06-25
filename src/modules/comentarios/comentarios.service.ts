import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { ComentariosDocument, Comentarios } from './schemas/comentarios.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateComentariosDto } from './dto/create-comentarios.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateComentariosDto } from './dto/update-comentarios.dto';


@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentarios.name)
        private ComentariosModel:
        Model<ComentariosDocument>
    ){}
    // METODO PARA CREAR PUBLICACIONES Y VERIFICAR

    async create(dto: CreateComentariosDto) {

  const comentario = await this.ComentariosModel.create({
    comentario: dto.comentario,
    publicacion_id: new Types.ObjectId(dto.Publicacion_id),
    user_id: new Types.ObjectId(dto.User_id),
  });

  return ResponseHelper.success(comentario, 201);
}
    // metodo para consultar publicaciones
    async findAll() {
    const comentarios = await this.ComentariosModel
      .find({ activo: true })
      .populate('user_id', 'password')
      .populate('publicacion_id','contenido')
      .sort({ createdAt: -1 })
      .lean();

    const data = comentarios.map((comentarios: any) => ({
      ...comentarios,
      user_id: comentarios.user_id,
    }));

    return ResponseHelper.success(data);
  }

    // consultas de publicaciones eliminadas logicamente

    async findInactive(){
        const comentarios=
        await this.ComentariosModel.find({activo: false});

        return ResponseHelper.success(comentarios);
    }

    // buscar por id

    async findOne(id:string){
        const comentarios=
        await this.ComentariosModel.findById(id);
        if (!comentarios){
            throw new NotFoundException('Rol no encontrado');
        }
        return ResponseHelper.success(comentarios, );
    }

    // actualizar una publicacion 

    async update(id:string, dto: UpdateComentariosDto){
        const comentarios= await this.ComentariosModel.findById(id);
        if(!comentarios){
            throw new NotFoundException('Rol no encontrado');
        }
        const updateComentarios=await this.ComentariosModel.findByIdAndUpdate(id, dto, {new:true});
        return ResponseHelper.success(updateComentarios);
    }

    // actualizacion parcial

    async partialUpdate(id:string, dto:UpdateComentariosDto){
        const comentarios=await this.ComentariosModel.findById(id);
        if(!comentarios){
            throw new NotFoundException('rol no encontrado')
        }
        const deleteComentarios= await this.ComentariosModel.findByIdAndUpdate(id,{activo:false,},{new:false});
        return ResponseHelper.success(deleteComentarios);
    }
    // eliminaicion logica 
    async remove(id:string){
        const role = await this.ComentariosModel.findById(id);

        if (!role){
            throw new NotFoundException('Rol no encontrado')
        }

        const deleteRole=await this.ComentariosModel.findByIdAndUpdate(id,{activo: false,},{new:true});

        return ResponseHelper.success(deleteRole);
    }

    // restaurar eliminacion
    async restore(id:string){
        const comentarios= await this.ComentariosModel.findById(id)

        if (!comentarios){
            throw new NotFoundException('Rol no encontrado')
        }
        const restoreComentarios= await this.ComentariosModel.findByIdAndUpdate(id, {activo:true,},{new:true});
        return ResponseHelper.success(restoreComentarios);
    }
}

