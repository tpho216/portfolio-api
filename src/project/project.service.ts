//project.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from "./project.dto";

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
      // const dummyProj = new Project();
      // dummyProj.name = "randomName";
      // dummyProj.description = "randomDesc";
      // const result = await this.repo.save(dummyProj);
      const projEntity = ProjectDTO.toEntity(object);
      return this.repo.save(projEntity).then(e => {
          return ProjectDTO.fromEntity(e)
        })

    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async destroy(id: string) {
    await this.repo.delete({id});
    return { deleted : true }
  }
}
