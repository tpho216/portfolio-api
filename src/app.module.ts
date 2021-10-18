import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProjectModule} from "./project/project.module";
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { SkillModule } from "./skill/skill.module";

const config = configService.getTypeOrmConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot(config)
    , ProjectModule, SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
