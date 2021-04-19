# 1. Running locally:
1. `yarn install && yarn run start:dev`

# 2. Running with docker
1. `docker-compose up -d`

# 3. Using API
I've provided simple API to play with the Rover. Check attached postman collection.

- POST `localhost:3000/land`, Body `{ x, y, direction, knownObstacles }`
- POST `localhost:3000/execute` Body `{ command }`

# 4. Run tests
1. `yarn install && yarn run test`
