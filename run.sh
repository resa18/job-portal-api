set -a # automatically export all variables
source .env
set +a

if ! docker ps -a --format '{{.Names}}' | grep -w $CONTAINER_NAME &> /dev/null; then
  docker compose -f docker-compose.yml --env-file ./.env up -d
  sleep 20
  docker exec -it $CONTAINER_NAME mysql -u root --password="$DB_PASSWORD" -e "CREATE USER '$DB_USERNAME'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
  docker exec -it $CONTAINER_NAME mysql -u root --password="$DB_PASSWORD" -e "GRANT ALL PRIVILEGES ON * . * TO '$DB_USERNAME'@'localhost';"
  docker exec -it $CONTAINER_NAME mysql -u root --password="$DB_PASSWORD" -e "UPDATE mysql.user SET host='%' WHERE user='$DB_USERNAME';"
  docker exec -it $CONTAINER_NAME mysql -u root --password="$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
  
  docker cp ./own_project_db.sql $CONTAINER_NAME:init.sql
  docker exec -it $CONTAINER_NAME /bin/sh -c "mysql -u root -ppassword -D $DB_NAME < init.sql"
  docker restart $CONTAINER_NAME
  sleep 20
else
  docker start $CONTAINER_NAME
  docker start $DDB_CONTAINER_NAME
  sleep 20
fi
