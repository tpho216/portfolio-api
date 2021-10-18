// skill.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm";
import { SkillService} from "./skill.service";
import { SkillController} from "./skill.controller";
import { Skill} from "../model/skill.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService],
  controllers: [SkillController],
  exports: []
})

export class SkillModule {}