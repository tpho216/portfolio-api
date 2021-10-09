#!/bin/bash

# This script assign app settings to the azure web app service

az webapp config appsettings set -g portfolio-rsgroup -n tphoportfolioapi --settings \
WEBSITE_NODE_DEFAULT_VERSION=6.9.1 WEBSITES_PORT=80 APPSETTINGS_POSTGRES_HOST=***SECRET*** \
APPSETTINGS_POSTGRES_PORT=***SECRET*** APPSETTINGS_POSTGRES_DATABASE=***SECRET*** \
APPSETTINGS_POSTGRES_USER=***SECRET*** APPSETTINGS_POSTGRES_PASSWORD=***SECRET*** \
APPSETTINGS_PORT=80 APPSETTINGS_MODE=PROD APPSETTINGS_RUN_MIGRATION=true