import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoleDocument, Role } from './schema/roles.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel:
        Model<RoleDocument>,
    ) {}
    // Metodo para crear un rol y verificar 

    async create(
        dto:CreateRoleDto,
    ){
        const role=
        await this.roleModel.create(dto);

        return ResponseHelper.success(
            role,
            201,
        );
    }

    // Metodo para consultar roles

    async findALL(){
        const roles=
        await this.roleModel.find({ activo:true, });

        return ResponseHelper.success(roles,);
    }

    // Consulta roles eliminados logicamente
    async findInactive(){
        const roles=
        await this.roleModel.find({ activo:false });
        
        return ResponseHelper.success(roles);
    }


// buscar un rol por ID
    async findOne(id:string){
        const role= await this.roleModel.findById(id);
        if (!role){
            throw new NotFoundException('ROL NO ENCONTRADO');
        }

        return ResponseHelper.success(role,);
    }

    // Actuaalizar completamente  un rol

    async update(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);
        if (!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const updateRole= await this.roleModel.findByIdAndUpdate(id, dto,{new:true});
        return ResponseHelper.success(updateRole);
    }

    // Actualiacion Parcial 

    async partialUpdate(id:string, dto:UpdateRoleDto){
        const role= await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('Rol no encontrado')
        }
        const updatedRole = await this.roleModel.findByIdAndUpdate(id,{$set:dto,},{new:true})
        return ResponseHelper.success(updatedRole)
    }

    // eliminacion logica
    async remove(id:string){
        const role = await this.roleModel.findById(id);

        if (!role){
            throw new NotFoundException('Rol no encontrado')
        }

        const deleteRole=await this.roleModel.findByIdAndUpdate(id,{activo: false,},{new:true});

        return ResponseHelper.success(deleteRole);
    }
    // Restaurar rol eliminado

    async resotre(id:string){
        const role= await this.roleModel.findById(id) 
    
    if (!role){
        throw new NotFoundException('Rol no encontrado')
    }

    const restoreRole= await this.roleModel.findByIdAndUpdate(id,{activo:true,},{new:true});
    return ResponseHelper.success(restoreRole)
    }
}