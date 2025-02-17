# Problem 5: A Crude Server
# Express TypeScript CRUD API
## This demo showcases a CRUD API for user management, including:
### Public REST API
### DTO validation
### Basic error handling
### Docker integration
### PostgreSQL database connection
### Database migrations

## Start with docker-compose
```sh
docker-compose up --build
```
## Start with docker-compose in background
```sh
docker-compose up --build -d
```

## Start with manual setup
### Create a .env file based on example.env.
### install package
```sh
npm install
```
### run dev
```sh
npm run dev
```
### run production
```sh
npm run build
npm start
```
## Migration database
### generate file migration with the change of entity
```sh
npm run migration:generate --name="name-of-version"
```

### migration database with new change
```sh
npm run migration:run
```
### revert database with last change
```sh
npm run migration:revert
```

## API Endpoints
## You can test APIs using the test.http file with the REST Client extension after starting the server.
### Get alls
```sh
curl -X GET "http://localhost:3008/users?page=1&size=2&keyword=John&status=pending"
```

### Get details
```sh
curl -X GET "http://localhost:3008/users/1"
```

### Create new user
```sh
curl -X POST "http://localhost:3008/users" \
     -H "Content-Type: application/json" \
     -d '{
           "email": "john.doe@yopmail.com",
           "fullname": "John Nguyen",
           "password": "JohnJohn"
         }'
```

### Update user
```sh
curl -X PUT "http://localhost:3008/users/2" \
     -H "Content-Type: application/json" \
     -d '{
           "email": "new.doe@yopmail.com",
           "status": "active"
         }'
```

### Delete user
```sh
curl -X DELETE "http://localhost:3008/users/1"
```