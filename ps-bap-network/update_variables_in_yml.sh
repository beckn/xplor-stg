
#!/bin/bash

# Load environment variables from .env file
set -o allexport
source .env
set +o allexport

# Define the path to the YAML file
YAML_FILE=config/default.yml

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
' $YAML_FILE > $TEMP_FILE

# Replace the original YAML file with the updated one
mv "$TEMP_FILE" "$YAML_FILE"

echo "YAML file has been updated with environment variables."

