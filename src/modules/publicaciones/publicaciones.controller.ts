import { Body, Controller, Get, Param, Post, Put, Query, Delete, Patch } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionesDto } from './dto/create-publicaciones.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchPublicacionesDto } from './dto/search-publicaciones.dto';
import { UpdatePublicacionesDto } from './dto/update-publicaciones.dto';

@ApiTags('Publicaciones')
@Controller('Publicaciones')
export class PublicacionesController {
  constructor(
    private readonly Service: 
    PublicacionesService,
  ) {}

  @Post()
  create(@Body() dto: CreatePublicacionesDto) {
    return this.Service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    Search: SearchPublicacionesDto
  ) {
    return this.Service.findAll();
  }
  @Get('inactivos')
    findInactive(){
        return this.Service.findInactive();
    }
   @Get(':id')
    findOne(
         @Param('id')
         id:string,
    ){
        return this.Service.findOne(id)
    }

   @Put(':id')
   update(
    @Param('id')
    id:string,
    @Body()
    dto: UpdatePublicacionesDto
   ){
    return this.Service.update(id, dto)
   }

   @Patch(':id')
    partialUpdate(
        @Param('id')
           id: string,
           @Body()
           dto:UpdatePublicacionesDto,
       ){
           return this.Service.partialUpdate(id, dto);
       }
    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id:string,
        ){
            return this.Service.restore(id);
        }
   @Delete(':id')
   remove(
    @Param('id')
    id:string
   ){
    return this.Service.remove(id);
   }
}