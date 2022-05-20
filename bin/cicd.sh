#! /bin/bash

# my machine has already nodejs azure-cli installed

# dependencies are already installed

# creating functions

prettier () {
    echo -e "\n##################################################################"
    echo "              $1"
    echo -e "##################################################################\n"
}


# Pushing to Github
git add . &&
git commit -m "$1" &&
git push https://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@github.com/MOSTA3D/final-project.git &&


# frontend CICD
cd finalProjectApp &&
prettier "Running Frontend tests"
npm run test &&
prettier "Building the app"
npm run build &&
prettier "Deploying the app to Azure app services"
npm run deploy &&
cd .. &&

# backend CICD
cd finalProjectBackend &&
prettier "Running Backend tests"
npm run test &&
prettier "Building the server"
npm run build &&
prettier "Deploying the server to Azure app services"
npm run deploy &&
prettier "End of the story"
cd ..

