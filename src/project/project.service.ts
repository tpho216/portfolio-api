//project.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from '../model/project.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from "./project.dto";

@Injectable()
export class ProjectService {
  constructor (@InjectRepository(Project) private readonly repo:
                 Repository<Project>) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: ProjectDTO) : Promise<ProjectDTO> {
    return this.repo.save(dto.toEntity()).then(e =>
      ProjectDTO.fromEntity(e))
  }
}
