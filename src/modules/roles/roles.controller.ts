import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import path from 'path';

@Controller('roles')
export class RolesController {
    constructor (
        private readonly service:
        RolesService,
    ){}


    // crear rol

    @Post()
    create(
        @Body()
        dto: CreateRoleDto,
    ){
        return this.service.create(
            dto,
        )
    }

    // para GET consultar roles
    @Get()
    findAll(){
        return this.service.findALL();
    }
    // Get para mostrar los datos inactivos
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }
    // Buscar rol por id
    @Get(':id')
    findOne(
        @Param('id')
        id:string,
    ){
        return this.service.findOne(id,);
    }

    // put para actualizar rol
    @Put(':id')
    update(
        @Param('id')
        id:string,

        @Body()
        dto:UpdateRoleDto,
    ){
        return this.service.update(id, dto);
    }

    // patch para actualizar algo especifico
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto:UpdateRoleDto,
    ){
        return this.service.partialUpdate(id, dto);
    }

    // Restaurar rol eliminado 
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id:string,
    ){
        return this.service.resotre(id);
    }
    
    // Eliminacion logica
    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.service.remove(id);
    }

}
