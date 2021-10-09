// project.controller.ts

import { Controller, Get, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Controller('project')
export class ProjectController {
  constructor(private serv: ProjectService) {
  }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

}

