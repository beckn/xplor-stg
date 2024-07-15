#!/bin/bash
cp config/samples/bap-client.yaml ~/default-bap-client.yml
cp config/samples/bap-network.yaml ~/default-bap-network.yml

./update_variables_in_yml.sh

docker compose up --build -d