// skill.controller.ts

import { Controller, Get, Post } from "@nestjs/common";
import { SkillService } from "./skill.service";

@Controller('skill')
export class SkillController {
  constructor(private serv: SkillService) {
  }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }
}