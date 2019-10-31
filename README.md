# Attiv Node Framework

## Conditions to follow this tutorial

For this tutorial to work, it is necessary to already have a pre-installed, configured mysql database and a created database.

In addition, it is necessary to have the npm and node installed in the latest versions

## Installation & Quick Setup

On root folder of your project you can run;

```
npm install attiv ^0.0.30
```

Add to the main file the follow lines

```
import { container, Application } from 'attiv';

container.register({
  config: asValue(process.env),
});

// the router where you can add your routes
const vittaRouter = container.resolve('router');
vittaRouter.get('/attiv', (req,res) => { res.json('Attiv')});
const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
```

So you can access http:\\\\localhost:3000\healthcheck

## Contributing

1 - Clone or repository

2 - Access the project you finished and clone

3 - Execute the following commands in the root directory of the application

```shell
npm install
```

In this step the framework is already configured and now it is already possible to reference your files using the alias `attiv`

4 - Access the `example` directory and execute the commands below

```shell
npm install
```

5 - Copy the `.env.example` file to example folder and change the name to`.env`

6 - Change the database settings in `.env` (DB\_\*)

7 - Execute the following commands to create the tables in mysql

```shell
node_modules/.bin/sequelize db:migrate
```

- If any errors occur in this step, review the configuration of the database

8 - Now run the `npm run dev` command to run the application, if everything went well your api is in the air, using the Vitta framework.
