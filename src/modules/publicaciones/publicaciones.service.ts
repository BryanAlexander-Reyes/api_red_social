import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { PublicacionDocument, Publicacion } from './schemas/publicaciones.eschema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublicacionesDto } from './dto/create-publicaciones.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdatePublicacionesDto } from './dto/update-publicaciones.dto';


@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicacion.name)
        private publicacionModel:
        Model<PublicacionDocument>
    ){}
    // METODO PARA CREAR PUBLICACIONES Y VERIFICAR

    async create(
        dto:CreatePublicacionesDto,
    ){
        const publicacion=
        await this.publicacionModel.create(dto);

        return ResponseHelper.success(
            publicacion,
            201,
        );
    }
    // metodo para consultar publicaciones
    async findALL(){
        const publicaciones=
        await this.publicacionModel.find({activo:true, });

        return ResponseHelper.success(publicaciones,);
    }

    // consultas de publicaciones eliminadas logicamente

    async findInactive(){
        const publicaciones=
        await this.publicacionModel.find({activo: false});

        return ResponseHelper.success(publicaciones);
    }

    // buscar por id

    async findOne(id:string){
        const publicaciones=
        await this.publicacionModel.findById(id);
        if (!publicaciones){
            throw new NotFoundException('Rol no encontrado');
        }
        return ResponseHelper.success(publicaciones, );
    }

    // actualizar una publicacion 

    async update(id:string, dto: UpdatePublicacionesDto){
        const publicaciones= await this.publicacionModel.findById(id);
        if(!publicaciones){
            throw new NotFoundException('Rol no encontrado');
        }
        const updatePublicaiones=await this.publicacionModel.findByIdAndUpdate(id, dto, {new:true});
        return ResponseHelper.success(updatePublicaiones);
    }

    // actualizacion parcial

    async partialUpdate(id:string, dto:UpdatePublicacionesDto){
        const publicaciones=await this.publicacionModel.findById(id);
        if(!publicaciones){
            throw new NotFoundException('rol no encontrado')
        }
        const deletePublicaiones= await this.publicacionModel.findByIdAndUpdate(id,{activo:false,},{new:false});
        return ResponseHelper.success(deletePublicaiones);
    }
    // eliminaicion logica 
    async remove(id:string){
        const role = await this.publicacionModel.findById(id);

        if (!role){
            throw new NotFoundException('Rol no encontrado')
        }

        const deleteRole=await this.publicacionModel.findByIdAndUpdate(id,{activo: false,},{new:true});

        return ResponseHelper.success(deleteRole);
    }

    // restaurar eliminacion
    async restore(id:string){
        const publicaciones= await this.publicacionModel.findById(id)

        if (!publicaciones){
            throw new NotFoundException('Rol no encontrado')
        }
        const restorePublicaciones= await this.publicacionModel.findByIdAndUpdate(id, {activo:true,},{new:true});
        return ResponseHelper.success(restorePublicaciones);
    }
}
