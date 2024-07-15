#!/bin/bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Define the paths to the YAML files
YAML_FILES=(./protocol-server/default-bap-client.yml ./protocol-server/default-bap-network.yml)

# Process each YAML file
for YAML_FILE in "${YAML_FILES[@]}"; do
  # Create a temporary file to store the updated YAML
  TEMP_FILE=$(mktemp)

  # Use awk to replace environment variable placeholders
  awk '
  BEGIN {
    while ((getline var < ".env") > 0) {
      split(var, arr, "=");
      key = arr[1];
      value = arr[2];
      for (i = 3; i <= length(arr); i++) {
        value = value "=" arr[i];
      }
      gsub(/"/, "", value);
      env_vars[key] = value;
    }
  }
  {
    line = $0;
    for (key in env_vars) {
      gsub("\\$\\{" key "\\}", env_vars[key], line);
    }
    print line;
  }
  ' "$YAML_FILE" > "$TEMP_FILE"

  # Replace the original YAML file with the updated one
  mv "$TEMP_FILE" "$YAML_FILE"

  echo "YAML file $YAML_FILE has been updated with environment variables."
done
