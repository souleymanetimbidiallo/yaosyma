#!/bin/bash

set -e  # Stop the script if any command fails

echo "Building the application..."
./mvnw package -Pprod jib:dockerBuild

echo "Stopping existing containers..."
docker-compose -f src/main/docker/app.yml down

echo "Starting new containers..."
docker-compose -f src/main/docker/app.yml up -d

echo "Application restarted successfully!"
