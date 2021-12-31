// skill.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "../model/skill.entity";
import { Repository } from "typeorm";
import { SkillDTO } from "./skill.dto";
import { CreateSkillDto } from "./create-skill.dto";

@Injectable()
export class SkillService {
  constructor(@InjectRepository(Skill) private readonly repo:
                Repository<Skill>) {}

  public async getAll() {
    return await this.repo.find();
  }

  public async findOne(id: string) {
    try {
      return await this.repo.findOneOrFail(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(id: string, skill : SkillDTO) {
    try {
      await this.repo.query(`UPDATE skill SET name = '${skill.name}'
                                , description = '${skill.description}'
                                where id = '${id}'`);
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async create(createSkillDto: CreateSkillDto) : Promise<CreateSkillDto>{
      try {
        var skill = new Skill();
        skill.name = createSkillDto.name;
        skill.description = createSkillDto.description;
        skill.languages = createSkillDto.languages;
        return await this.repo.save(skill);
      }
      catch (e) {
        console.log(e);
        throw e;
      }


  }

  public async remove(id: string) {
    try {
      const skill = await this.findOne(id);
      return await this.repo.delete(skill);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
