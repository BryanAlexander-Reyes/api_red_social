import { PartialType } from '@nestjs/swagger';
import { CreateSeguidorDto } from './create-seguidores.dto';

export class UpdateSeguidorDto extends PartialType(CreateSeguidorDto) {}
