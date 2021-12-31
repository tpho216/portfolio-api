import { ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsString, IsUUID} from 'class-validator';
import { Skill } from '../model/skill.entity';

export class SkillDTO implements Readonly<SkillDTO> {
 @ApiModelProperty({required: true})
 @IsUUID()
 id: string;

 @ApiModelProperty({ required: true})
 @IsString()
 name: string;


 @ApiModelProperty({ required: true})
 @IsString()
 description: string;

 @ApiModelProperty({required: true})
 @IsString()
 languages: string[];

 public static from (dto: Partial<SkillDTO>) {
  const skill = new SkillDTO();
  skill.id = dto.id;
  skill.name = dto.name;
  skill.description = dto.description;
  skill.languages = dto.languages;


  return skill;
 }

 public static fromEntity(entity: Skill) {
  return this.from({
   id: entity.id,
   name: entity.name,
   description: entity.description,
   languages: entity.languages

  })
 }

 public toEntity() {
  const skill = new Skill();
  skill.id = this.id;
  skill.name = this.name;
  skill.description = this.description;
  skill.languages = this.languages;
  return skill;
 }
}
