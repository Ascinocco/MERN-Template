#!/usr/bin/env bash

# Runs the multi-container setup

# remove link from previous mongo container or it will error
docker rm --link mongo

# run compose
docker-compose up
