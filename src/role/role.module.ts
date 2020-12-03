import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from "./role.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [TypeOrmModule],
  providers: [RoleService]
})
export class RoleModule {}
