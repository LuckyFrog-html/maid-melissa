# Maid Melissa Stone

## Getting Started

#### Note
To see hebrew version of site go to /he

### Requirements

To run this app you need to install:

- postgresql
- nodejs

### Database

First of all you need to configure server. (you may call everythin as you want, it will be used in /server/.env)

1. Create database "maid_melissa"
2. Create user "postgres" (it creating by default when install pg) and grant all privilegies for table
3. Create and configure /server/.env as in /server/.env.example:
[Guide for DATABASE_URL](https://www.prisma.io/docs/concepts/database-connectors/postgresql#base-url-and-path)

        DATABASE_URL="postgresql://postgres:1234@localhost:5432/maid_melissa"
        PORT=5000
        JWT_ACCESS_SECRET=9soay9K4W8n2CK0ifYnwQsytFSIKPyBkLIqVgQKONf8yJIQI5Xi1mNEFDjcKD1eP
        JWT_REFRESH_SECRET=U2DSUb5sYMjqRPBEBdhgOOccYq8WVpKjXS9kDfG0qLUFnUGcNAY05DfuCBrPRntU

4. Run "npm i" in /server directory
5. Run "npx prisma db push" in /server directory to push schema.prisma to db
6. Run server with "npm run start:dev"
7. Add data from /server/dump.csv to table "Hours".

You can do it with command 

        \copy "Hour" FROM '*path_to_file*/dump.csv' DELIMITER ',';

(you neeed to run this command in psql) 

**OR**

with GET request to http://localhost:5000/hours when server is running

### Client

Then you need to run client:

1. Run "npm i" in /client directory;
2. Run "npm run dev"

## Result

You can see result in http://localhost:3000
