import { PartialType } from "@nestjs/swagger";
import { CreateReaccionDto } from "./create-reacciones.dto";


export class UpdateReaccionDto extends PartialType(CreateReaccionDto){
    
}