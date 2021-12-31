// skill.controller.ts

import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { SkillService } from "./skill.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SkillDTO } from "./skill.dto";
import { HttpExceptionFilter } from "../utils/ExceptionFilters";
import { CreateSkillDto } from "./create-skill.dto";

@ApiTags('Skills')
@Controller('skill')
export class SkillController {
  constructor(private serv: SkillService) {
  }

  @Post()
  @ApiOperation({ summary: 'insert a skill to current skills'})
  public async create(@Body() createSkillDto: CreateSkillDto) :Promise<CreateSkillDto> {
    return await this.serv.create(createSkillDto);
  }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get skill by id'})
  public async findOne(@Param('id') id : string) {
    return await this.serv.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary:"update skill by id"})
  @UseFilters(HttpExceptionFilter)
  public async update(@Param('id') id : string, @Body() skill : SkillDTO) {
    try {
      await this.serv.update(id, skill);
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: `delete skill`})
  public async delete(@Param('id') id : string) {
      await this.serv.remove(id);
  }
}
