import { Body, Controller, Get, Param, Post, Put, Query, Delete, Patch } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';
import { CreateSeguidorDto } from './dto/create-seguidores.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchSeguidoresDto } from './dto/search-seguidores.dto';
import { UpdateSeguidorDto } from './dto/update-seguidores.dto';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
    constructor(
        private readonly Service: SeguidoresService,
    ) {}

    @Post()
    create(@Body() dto: CreateSeguidorDto) {
        return this.Service.create(dto);
    }

    @Get()
    findAll(
        @Query()
        Search: SearchSeguidoresDto,
    ) {
        return this.Service.findAll();
    }

    @Get('inactivos')
    findInactive() {
        return this.Service.findInactive();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.Service.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateSeguidorDto,
    ) {
        return this.Service.update(id, dto);
    }

    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateSeguidorDto,
    ) {
        return this.Service.partialUpdate(id, dto);
    }

    @Patch(':id/restaurar')
    restore(
        @Param('id')
        id: string,
    ) {
        return this.Service.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.Service.remove(id);
    }
}
