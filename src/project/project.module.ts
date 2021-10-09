// project.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Project } from "../model/project.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: []
})

export class ProjectModule {}