import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema, Role } from './schema/roles.schema';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    MongooseModule.forFeature([{
      name: Role.name,
      schema: RoleSchema
    },]),
  ],
})
export class RolesModule {}
