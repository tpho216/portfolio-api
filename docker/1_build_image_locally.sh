#!/bin/bash

# This script build the image locally in your docker

cd .. #navigate to root folder
docker build -f Dockerfile -t portfolioapi .