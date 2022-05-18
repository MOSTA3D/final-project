#! /bin/bash

cd dist &&
az webapp up --sku F1 --resource-group detectors --name detectorserver --location eastus2 &&
az webapp config appsettings set --name detectorserver --resource-group detectors --settings ENV=$ENV DB=$DB DB_PORT=$DB_PORT DB_HOST=$DB_HOST DB_USER=$DB_USER DB_PASSWORD=$DB_PASSWORD SALT_ROUNDS=$SALT_ROUNDS PEPPER=$PEPPER PVTKEY=$PVTKEY &&
cd ..

