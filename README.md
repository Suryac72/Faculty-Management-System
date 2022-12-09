Faculty Management System (...still in dev mode...)
This is a Role Based Access Control with ERP implementation application using Nodejs, Express, Passport Js, MySQL etc. You can use this application as the starting point for whatever project you are going to build which needs authentication and authorization.

For authentication we have only Email & Password option but other authentication options using OAuth/OAuth2.0 like Google, Facebook, Apple, GitHub, etc, can be easily incorporated.

The application is based on the MVC pattern i.e. Model View Controller.

Sequelize is used as an ORM(Object Relational Mapping) for MongoDB for storing Users in Database.

Passport JS is used for local(email, password) authentication.

The application is almost production ready.

To start setting up the project
Step 1: Clone the repo

git clone https://github.com/trulymittal/role-based-access-control
Step 2: cd into the cloned repo and run:

npm install
Step 3: Put your credentials in the .env file.


PORT = 3000
SESSION_SECRET = some super secret
DB_NAME=YOUR_DB_NAME

Step 4: Install MySQL8 

See (https://dev.mysql.com/downloads/mysql/) for more infos

Step 5: Start the app by

npm start

Contribute
You can fork this repo and send me a PR.

License
This Project is Public Repository for learning Purpose
