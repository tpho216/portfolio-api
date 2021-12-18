// project.controller.ts

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { Project } from "../model/project.entity";
import { ProjectDTO } from "./project.dto";
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../utils/ExceptionFilters";


@ApiTags('Projects')
@ApiHeader({
  name: 'Projects',
})
@Controller('project')
export class ProjectController {
  constructor(private serv: ProjectService) {
  }

  @Get()
  @ApiOperation({summary:'get all projects'})
  public async getAll() {
    return await this.serv.getAll();
  }
  @Delete('All')
  @ApiOperation({summary: 'delete all projects'})
  public async deleteAll() {
      try {
        await this.serv.destroyAll();
        return {
          statusCode: HttpStatus.OK,
          message: "All projects deleted"
        }
      }
      catch (e) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: e
        }
      }

  }


  //individual project operations
  @Post()
  @ApiOperation({ summary: 'insert a project to current projects'})
  public async post(@Body() projectDTO: ProjectDTO) : Promise<ProjectDTO> {
    try {
      return this.serv.create(projectDTO);
    }
    catch (e) {
      console.log(e);
      throw new e;
    }
  }

  @Put(':id')
  @ApiOperation({summary:"replace a project name & description given the project id"})
  @UseFilters(HttpExceptionFilter)
  async replaceProject(@Param('id') id: string, @Body() project : ProjectDTO) {
    try {
      await this.serv.replace(id, project);
      return {
        statusCode: HttpStatus.OK,
        message: "Project replaced successfully"
      };
    }
    catch (e) {
      console.log(e);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: e
      }
    }
  }


  @Delete(':id')
  @ApiOperation({ summary: `delete project from current projects given the project id`})
  public async delete(@Param('id') id: string) {
    try {
        await this.serv.destroy(id);
        return {
          statusCode: HttpStatus.OK,
          message: "Project deleted successfully"
        };
    }
    catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: e
      }
    }
  }



}

