#!/bin/bash

# this script add environment variables to the docker container so that it will be connected to the database
# It doesn't work with local docker database though

docker run --env APPSETTINGS_POSTGRES_HOST=***SECRET*** \
--env APPSETTINGS_POSTGRES_PORT=***SECRET*** --env APPSETTINGS_POSTGRES_DATABASE=***SECRET*** \
--env APPSETTINGS_POSTGRES_USER=***SECRET*** --env APPSETTINGS_POSTGRES_PASSWORD=***SECRET*** \
--env APPSETTINGS_PORT=***SECRET*** --env APPSETTINGS_MODE=PROD --env APPSSETTINGS_RUN_MIGRATION=true \
--env WEBSITES_PORT=***SECRET*** -d -p 80:3070 --name portfolioapi portfolioapi \
