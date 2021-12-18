// skill.entity.ts
import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: 'skill'})
export class Skill extends BaseEntity {
    @Column({type: 'varchar', length: 300})
    name : string;

    @Column({type: 'varchar', length:300})
    description: string;

    @Column({type: 'varchar', array : true})
    languages: string[];
}