// project.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name: 'project'})
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 300})
  name : string;

  @Column({ type:'varchar', length: 300})
  description: string;

}