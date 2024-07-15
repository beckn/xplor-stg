#!/bin/bash

cp .env ./protocol-server/.env
cp ./protocol-server/config/samples/bap-client.yaml ./protocol-server/default-bap-client.yml
cp ./protocol-server/config/samples/bap-network.yaml ./protocol-server/default-bap-network.yml

bash ./protocol-server/update_variables_in_yml.sh
docker-compose up --build -d
