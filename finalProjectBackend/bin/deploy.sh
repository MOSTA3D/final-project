DB_HOST_TEST=detectorsdb.postgres.database.azure.com
DB_PASSWORD_TEST=Atrigan?1
DB_USER_TEST=detector;
DB_TEST=postgres;
DB_PORT=5432;
ENV=dev;

SALT_ROUNDS=10;
PEPPER=someSortOfPepper;

PVTKEY=xdqvkB43QajcBzi2fW0b9k+gFVW3JBqfjkQcLbSHJy1lGXkC8qN6PmpgExmGyJ5aGoXPdVxhT4UQ/I2/eb8P5GLc8FdqrxAI/WqrKSO0D8LsLC/ZpZUIxp3hGTkOfrH/lvkN2PiPAeaCTi6qSrc5tDbET2ZlONjvdk1CbC6m9b8HsRDgpdoZp5NM4T+T7jBO+GOHc1HvWHOur1fqOY0EzwFdkhENa7oIEu6l3B5c5ebEoHXoOo/WdWjM8VXMKHdbAcDV8ltmYbq97BmKCtBEs5TX2881prmP+Fq249BIdFKCMzzUr1dNSIfcBBAmyB5fuQyupxSf7LrtQryp0VjEHA==;

cd dist &&
az webapp up --sku F1 --resource-group detectors --name detectorserver --location eastus2 &&
az webapp config appsettings set --name detectorserver --resource-group detectors --settings ENV=$ENV DB=$DB_TEST DB_PORT=$DB_PORT DB_HOST=$DB_HOST_TEST DB_USER=$DB_USER_TEST DB_PASSWORD=$DB_PASSWORD_TEST SALT_ROUNDS=$SALT_ROUNDS PEPPER=$PEPPER PVTKEY=$PVTKEY &&
cd ..

