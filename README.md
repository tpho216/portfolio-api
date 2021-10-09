# Portfolio API backend that is deployed to Azure Web App


## SET UP GUIDE
`git clone https://github.com/tpho216/portfolio-api.git`

then run `npm install`

also `npm update`

then acquire these files (or folders)

`typeormconfig.json` (generated)

`/keys` which includes `.develpment-key.env` and `.production-key.env`

### to deploy
Replace the appropriate secret keys for scripts under `docker`

## Descrition
Return data for portfolio site (front end)

### Describe folders

#### /.github/workflow
Initially wanted this to deploy code onto azure. 
This deployment has complications so utilizing docker 
container deployment is better

#### /docker
Inside are the scripts meant to smooth the process of deployment to azure
with docker container

#### /src
View src/README

#### /test
Not implemented

### Describe files
#### .dockerignore
Self explanatory?

#### .gitignore
Self explanatory?

#### .prettierrc
To be honest, never use this

#### Dockerfile
Important file to build docker image and upload to azure

#### configure.env.ts
This is to switch between development and production environment,
require /keys

#### nest-cli.json
Self explanatory?

#### nodemon.json
Self explanatory? (used to 'hot-reload' nodejs application)

#### ormconfig
Used for configure typeorm which work with nestjs & swagger, I'm not 100%
sure what it's for

#### package.json
Everyone knows about this file...

#### tsconfig.build.json
Probably relating to build Typescript config

#### tsconfig.build.json
Probably relating to Typescript config

### Describe Hidden folders neccessary to configure credentials & keys

#### /keys
You will not have it, but as an maintainer need to have these 2 files
#####.development-key.env
#####.production-key.env

#### /node_modules
This is famous folders, but will always be generated with `npm run install`

#### dist
This is build folder, will be generated with `npm run build`

