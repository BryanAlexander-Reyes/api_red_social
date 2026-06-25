import { PartialType } from "@nestjs/swagger";
import { CreatePublicacionesDto } from "./create-publicaciones.dto";

export class UpdatePublicacionesDto extends PartialType(CreatePublicacionesDto){
    
}