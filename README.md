# Attiv Node Framework

### Conditions to follow this tutorial

For this tutorial to work, it is necessary to already have a pre-installed, configured mysql database and a created database.

In addition, it is necessary to have the npm and node installed in the latest versions

### Installation

1 - Clone or repository

2 - Access the project you finished and clone

2.1 - Change the package.json by adding the following content only to test the example

```shel
"_moduleAliases": {
   "attiv": "../framework"
},
```

3 - Execute the following commands in the root directory of the application

```shell
npm install
npm run postinstall
```

In this step the framework is already configured and now it is already possible to reference your files using the alias `vitta-api`

4 - Access the `example` directory and execute the commands below

```shell
npm install
```

5 - Change the name of the `.env.example` file to`.env`

6 - Change the database settings in `.env`

7 - Execute the following commands to create the tables in mysql

```shell
node_modules/.bin/sequelize db:migrate
```

- If any errors occur in this step, review the configuration of the database

8 - Now run the `npm run dev` command to run the application, if everything went well your api is in the air, using the Vitta framework.
