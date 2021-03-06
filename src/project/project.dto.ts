import { ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsString, IsUUID} from 'class-validator';
import { Project } from '../model/project.entity';

export class ProjectDTO implements Readonly<ProjectDTO> {
  @ApiModelProperty( {required: true})
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true})
  @IsString()
  name: string;


  @ApiModelProperty({ required: true})
  @IsString()
  description: string;

  public static from (dto: Partial<ProjectDTO>) {
    const proj = new ProjectDTO();
    proj.id = dto.id;
    proj.name = dto.name;
    proj.description = dto.description;
    return proj;
  }

  public static fromEntity(entity: Project) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description
    })
  }

  public toEntity() {
    const proj = new Project();
    proj.id = this.id;
    proj.name = this.name;
    proj.description = this.description;
    return proj;
  }

}