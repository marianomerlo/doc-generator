#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print shell input lines as they are read
set -v

# If not running in JENKINS
if [ -z ${JENKINS_PROCESS} ]; then
  echo 'Running create-schema script since running in localhost'
  
  # Get database groupId, artifactId and version
  GROUP_ID=`node -e "console.log(require('./package.json').config.database.group);"`
  ARTIFACT_ID=`node -e "console.log(require('./package.json').config.database.name);"`
  VERSION=`node -e "console.log(require('./package.json').config.database.version);"`

  rm -rf db
  mkdir db

  cd db

  # If using default M2_REPO
  if [ -z ${M2_REPO} ]; then
    BASE_REPOSITORY_URI=~/.m2/repository/
  else
    BASE_REPOSITORY_URI=${M2_REPO}/
  fi

  URI=${BASE_REPOSITORY_URI}`echo ${GROUP_ID} | tr . /`/${ARTIFACT_ID}/${VERSION}/${ARTIFACT_ID}-${VERSION}.zip
  
  unzip "$URI"

  cd ${ARTIFACT_ID}

  # Run Liquibase migrations
  mvn process-resources -PdbCreate -Ddatabase.propertiesFile=src/main/resources/db-test.properties 

  cd ../..

  rm -rf db
else
  echo 'Skipping script since running in CI Server'
fi
