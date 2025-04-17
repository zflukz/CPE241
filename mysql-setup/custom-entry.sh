#!/bin/bash

# Path to dump directory and SQL file
DUMP_PATH="/mysql-dumps/chickenairlines-latest.sql"
SQL_INIT_FILE="/mysql-setup/import-always.sql"
MYSQL_PASSWORD="password"
MYSQL_USER="root"
DATABASE="chickenAirlines"

# Generate a timestamp for backup
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
DUMP_TIMESTAMP_PATH="/mysql-dumps/chickenairlines-${TIMESTAMP}.sql"

# Function to check if database exists
database_exists() {
  mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SHOW DATABASES LIKE '$DATABASE';" | grep -q "$DATABASE"
}

# 🪓 Always dump all data and tables on container stop with timestamped filename
trap '
  echo "[EXIT] Dumping entire database $DATABASE (tables + data) to $DUMP_TIMESTAMP_PATH..." 
  mysqldump -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" --databases "$DATABASE" --no-create-info --skip-triggers --skip-add-locks > "$DUMP_PATH";
  echo "[EXIT] Dump complete. Goodbye!"
  exit 0
' SIGTERM

# ✅ Pull the latest dump (if available) before starting the MySQL server
echo "[INIT] Pulling the latest database dump from host machine..."

if [ -f "$DUMP_PATH" ]; then
  echo "[INIT] Found dump file $DUMP_PATH. Importing data into MySQL..."
  mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$DUMP_PATH"
else
  echo "[INIT] No existing dump file found. Starting fresh..."
fi

# ✅ Check if the database exists, if not, create it and import SQL file
echo "[INIT] Checking if database $DATABASE exists..."

if ! database_exists; then
  echo "[INIT] Database does not exist. Creating $DATABASE..."
  mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "CREATE DATABASE $DATABASE;"
  echo "[INIT] Importing SQL setup file..."
  if [ -f "$SQL_INIT_FILE" ]; then
    mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$SQL_INIT_FILE"
    echo "[INIT] Database $DATABASE has been initialized with data from $SQL_INIT_FILE."
  else
    echo "[WARN] SQL init file not found: $SQL_INIT_FILE"
  fi
else
  echo "[INIT] Database $DATABASE already exists. Ensuring it's up to date..."
  # Ensure latest data is always imported or synced (for example, pulling latest data)
  if [ -f "$SQL_INIT_FILE" ]; then
    echo "[INIT] Importing latest data from $SQL_INIT_FILE..."
    mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$SQL_INIT_FILE"
    echo "[INIT] Latest data imported successfully."
  else
    echo "[WARN] SQL init file not found: $SQL_INIT_FILE"
  fi
fi

# ▶️ Start MySQL server in background
echo "[INIT] Starting MySQL server..."
docker-entrypoint.sh mysqld &
mysql_pid=$!

# ⏳ Wait until MySQL exits (or SIGTERM triggers)
wait $mysql_pid
