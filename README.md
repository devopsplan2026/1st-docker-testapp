# docker-testapp



docker-compose up --build

# backed UI : http://localhost:8081/

# Frontend UI : http://localhost:5050/

sudo apt install nodejs

----------------------------------

docker network create mongo-network

-------------------------

docker run -d \
  -p 27017:27017 \
  --name mongo \
  --network mongo-network \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=vishal \
  mongo
----------------------------------
docker run -d \
  -p 8081:8081 \
  --name mongo-express \
  --network mongo-network \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=vishal \
  -e ME_CONFIG_MONGODB_URL="mongodb://admin:vishal@mongo:27017" \
  mongo-express

  ----------

Start the application to run : node server.js


  localhost:5050/getUser
