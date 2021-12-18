//project.service.ts

import { Body, Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from "./project.dto";
import { ApiHeaders, ApiTags } from "@nestjs/swagger";

@Injectable()
export class ProjectService {
  constructor (@InjectRepository(Project) private readonly repo:
                 Repository<Project>) {

  }

  public async getAll() {
    const result = await this.repo.find();
    return result;
  }

  public async create(object: any) : Promise<ProjectDTO> {
    try {
      const projEntity = ProjectDTO.toEntity(object);
      return this.repo.save(projEntity).then(e => {
          return ProjectDTO.fromEntity(e);
        },
        )

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

  public async replace(id: string, newProj : ProjectDTO) {
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
    return { deleted : true }
  }
}
