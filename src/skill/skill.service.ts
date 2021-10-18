// skill.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "../model/skill.entity";
import { Repository } from "typeorm";
import { SkillDTO } from "./skill.dto";

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private readonly repo:
                Repository<Skill>) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async create(dto: SkillDTO) : Promise<SkillDTO>{
      return this.repo.save(dto.toEntity()).then(e =>
        SkillDTO.fromEntity(e))
  }

}