// src/config/config.service.ts
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
const {env} = process;
const tryImportDotEnv = () : boolean => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const result = require('dotenv').config();
  console.log("Running dotenv.config()...");

  if (result.error) {
    console.log("Error in configuring dotenv ..." + result.error);
    return false;
  } else {
    return true;
  }
}

const loadEnvSuccessfully = tryImportDotEnv();
if (!loadEnvSuccessfully) { //failed
  console.log("Loading production configuration failed ... ");
}
 else { //success
  console.log("Loading production configuration successfully ... ");
}


/**
 * currently this nodejs environment are not applied with app settings in docker
 * deployment runtime
 * TODO: need to resolve this issue, currently hard coded, keys are hidden in
 * local work env
 */

const PORT = env.APPSETTINGS_PORT;
const MODE = env.APPSETTINGS_MODE;
const POSTGRES_HOST = env.APPSETTINGS_POSTGRES_HOST;
const POSTGRES_PORT : any = env.APPSETTINGS_POSTGRES_PORT;
const POSTGRES_USER = env.APPSETTINGS_POSTGRES_USER;
const POSTGRES_PASSWORD = env.APPSETTINGS_POSTGRES_PASSWORD;
const POSTGRES_DATABASE = env.APPSETTINGS_POSTGRES_DATABASE;

class ConfigService {

  public isProduction() {
    return MODE === 'PROD';
  }

  public getTypeOrmConfig() : TypeOrmModuleOptions {
    console.log('MODE::::::', MODE);
    console.log('API PORT::::::', PORT);
    console.log('POSTGRES_HOST:::::::::::::', POSTGRES_HOST);
    console.log('POSTGRES_PORT::::::',POSTGRES_PORT);
    console.log('POSTGRES_USER::::::', POSTGRES_USER);
    console.log('POSTGRES_PASSWORD::::::', POSTGRES_PASSWORD);
    console.log('POSTGRES_DATABASE::::::', POSTGRES_DATABASE);

    var configSettings : TypeOrmModuleOptions;
    if (this.isProduction()) {
      configSettings = {
        type: 'postgres',
        port: POSTGRES_PORT,
        host: POSTGRES_HOST,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DATABASE,

        entities: ['**/*.entity{.ts,.js}'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
          entitiesDir: 'src/entity'
        },
        ssl: this.isProduction(),
      };
    } else {
      configSettings = {
        type: 'postgres',
        port: POSTGRES_PORT,
        host: POSTGRES_HOST,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DATABASE,

        entities: ["dist/**/*.entity.js"],

        ssl: this.isProduction(),
      };
    }
    return configSettings;
  }
}

const configService = new ConfigService();

export { configService }
