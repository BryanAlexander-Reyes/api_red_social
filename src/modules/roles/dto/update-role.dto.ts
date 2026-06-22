import { PartialType } from "@nestjs/swagger";
import { CreateRoleDto } from "./create-role.dto";
import { create } from "domain";

// DTO para actualizar un rool
// PartialType czonvierte todas las propiedades 
// CreateRoleDTO campos opcionales

export class UpdateRoleDto extends PartialType(
    CreateRoleDto,
){}