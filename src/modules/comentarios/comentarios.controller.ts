import { Body, Controller, Get, Param, Post, Put, Query, Delete, Patch } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentariosDto } from './dto/create-comentarios.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchComentariosDto } from './dto/search-comentarios.dto';
import { UpdateComentariosDto } from './dto/update-comentarios.dto';

@ApiTags('Comentarios')
@Controller('Comentarios')
export class ComentariosController {
  constructor(
    private readonly Service: 
    ComentariosService,
  ) {}

  @Post()
  create(@Body() dto: CreateComentariosDto) {
    return this.Service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    Search: SearchComentariosDto
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
    dto: UpdateComentariosDto
   ){
    return this.Service.update(id, dto)
   }

   @Patch(':id')
    partialUpdate(
        @Param('id')
           id: string,
           @Body()
           dto:UpdateComentariosDto,
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