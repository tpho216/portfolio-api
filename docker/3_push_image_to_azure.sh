#!/bin/bash

# this script build the image and push it to azure repository

# cd .. # navigate to the root folder
docker build -f Dockerfile -t portfolioapi .
az acr build --image portfolioapi:v2\
  --registry tphoportfolioapi \
  --file Dockerfile .
