//project.service.ts

import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from "./create-project.dto";

@Injectable()
export class ProjectService {
  constructor (@InjectRepository(Project) private readonly repo:
                 Repository<Project>) {

  }

  public async getAll() {
    const result = await this.repo.find();
    return result;
  }

  public async findOne(id : string) {
    const result = await  this.repo.findOneOrFail(id);
    return result;
  }

  public async create(createProjectDto: CreateProjectDto) : Promise<CreateProjectDto> {
    try {
      var project = new Project();
      project.name = createProjectDto.name;
      project.description = createProjectDto.description;
      return await this.repo.save(project);
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async destroyAll() {
    await this.repo.query(`DELETE FROM project;`);
  }

  //individual project operations

  public async update(id: string, newProj : CreateProjectDto) {
    try {
      await this.repo.query(`UPDATE project SET name = '${newProj.name}'
                                , description = '${newProj.description}'
                                where id = '${id}'`);

    }
    catch (e) {
      console.log(e);
    }
  }

  public async destroy(id: string) {
    await this.repo.delete({id});
    return { deleted : true };
  }
}
