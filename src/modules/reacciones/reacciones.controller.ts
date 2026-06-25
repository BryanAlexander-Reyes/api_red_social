import { Body, Controller, Get, Param, Post, Put, Query, Delete, Patch } from '@nestjs/common';
import { ReaccionesService } from './reacciones.service';
import { CreateReaccionDto } from './dto/create-reacciones.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchReaccionesDto } from './dto/search-reacciones.dto';
import { UpdateReaccionDto } from './dto/update-reacciones.dto';

@ApiTags('Reacciones')
@Controller('Reacciones')
export class ReaccionesController {
  constructor(
    private readonly Service: 
    ReaccionesService,
  ) {}

  @Post()
  create(@Body() dto: CreateReaccionDto) {
    return this.Service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    Search: SearchReaccionesDto
  ) {
    return this.Service.findAll(Search);
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
    dto: UpdateReaccionDto
   ){
    return this.Service.update(id, dto)
   }

   @Patch(':id')
    partialUpdate(
        @Param('id')
           id: string,
           @Body()
           dto:UpdateReaccionDto,
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