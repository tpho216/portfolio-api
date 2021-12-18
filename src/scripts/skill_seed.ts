// scripts/skill_seed.ts
import * as _ from 'lodash';
import { createConnection, ConnectionOptions} from "typeorm";
import { configService} from "../config/config.service";
import { Skill } from '../model/skill.entity'
import { SkillService } from "../skill/skill.service";
import { SkillDTO } from "../skill/skill.dto";

async function run() {

  const seedId = Date.now().toString().split('').reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {...configService.getTypeOrmConfig(), debug: true};

  const connection = await createConnection(opt as ConnectionOptions);
  const skillService = new SkillService(connection.getRepository(Skill))
  const work = _.range(1, 10).map(n => SkillDTO.from({
    name: `seed${seedId}-${n}`,
    description: 'created from seed',
    languages: ['created from seed', 'created from seed']
  })).map(dto => skillService.create(dto).then(r => (console.log('done ->',
    r.name),r)));
  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.log('seed error' + error))
