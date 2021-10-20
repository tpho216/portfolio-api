// project.controller.ts

import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { Project } from "../model/project.entity";
import { ProjectDTO } from "./project.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('project')
export class ProjectController {
  constructor(private serv: ProjectService) {
  }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'insert project to current projects'})
  public async post(@Body() projectDTO: ProjectDTO) : Promise<ProjectDTO> {
    try {
      // const dummyProjDTO = new ProjectDTO();
      // dummyProjDTO.id = "8d91a8e9-bd9b-4e68-8678-d4a2519d456b";
      // dummyProjDTO.name = "randomName";
      // dummyProjDTO.description = "randomDesc";
      //return dummyProjDTO;
      return this.serv.create(projectDTO);
     }
    catch (e) {
        console.log(e);
        throw new e;
     }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete project from current projects given the project id'})
  public async delete(@Param('id') id: string) {
    try {
        await this.serv.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: "Project deleted successfully"
        };
    }
    catch (e) {

    }
  }



}

