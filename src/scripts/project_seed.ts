// scripts/project_seed.ts
import * as _ from 'lodash';
import { createConnection, ConnectionOptions} from "typeorm";
import { configService} from "../config/config.service";
import { Project } from '../model/project.entity';
import { ProjectService} from "../project/project.service";
import { ProjectDTO } from '../project/project.dto';

async function run() {

  const seedId = Date.now().toString().split('').reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {...configService.getTypeOrmConfig(), debug: true};

  const connection = await createConnection(opt as ConnectionOptions);
  const projectService = new ProjectService(connection.getRepository(Project));

  const work = _.range(1, 10).map(n => ProjectDTO.from({
    name: `seed${seedId}-${n}`,
    description: 'created from seed'
  })).map(dto => projectService.create(dto).then(r => (console.log('done ->',
    r.name),r)));
  return await Promise.all(work);
}

run()
.then(_ => console.log('...wait for script to exit'))
  .catch(error => console.log('seed error', error))
