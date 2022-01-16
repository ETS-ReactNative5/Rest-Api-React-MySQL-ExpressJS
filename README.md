
# REST API using Node.js, Express, MySQL and Sequelize
This project is football league, C.R.U.D project which contains:
teams, players, team-players and results.

## Directory Structure
- /models - Define all model/table schema via Sequelize ORM which are generated when running server;
- /migrations - you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.
- /controllers - Store all controller files for different modules which contains REST API method;
- /routes - Store all routes for different modules;
- server.js - Base filfe that runs the Nodejs App;
- env.example - An example environment variable.

## Packages Used

-** Express** : Flexible and minimal web app for Node.js framework.  
-** MySQL** : It's required as a support for Sequelize package for MySQL databases.  
-** Sequelize** : Promise-base Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.  
-** Sequelize.cli** : Sequelize Command-Line Interface(CLI) ships support for migrations and project bootstrapping.  
-** Dotenv** : Zero-dependency module that loads environment variables from a .env file into process.env.  

## Development Dependancies

 **- Nodemon** : Tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Instaling packages and dependancies          
````
npm install express mysql2 sequelize sequelize-cli dotenv nodemon
````
## Environment configurations
Create a file with the following name and location .env and copy the contents from .env.example into it. Replace the values with your specific configuration.
```
#Database
DB_HOST=your-db-host
DB_USER=your-db-username
DB_PASS=your-db-password
DB_SCHEMA=your-db-schema-name
```
## Migrating the tables
Before you start the app you need to migrate the tables into the database:
```
sequelize db:migrate
```

## Running the App
You can then run server.js in node, or use nodemon to run the app locally