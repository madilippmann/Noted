# Noted

<!-- # <img src="/public/static/images/logo.jpg" alt="profile page for logged-in user wireframe" style="width:50px;"/>   MoOA - *Museum of Online Art*  -->


<!-- ## Table of Contents
  - [Description](#description)
  - [Index](#index)
  - [Link to live site](#link-to-live-site)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Demo](#demo)
 -->

## Description

Noted is a note-taking application for users to create and organize their notes. Noted is a clone of [Evernote](https://evernote.com/).

## Index
| [Features List](https://github.com/madilippmann/Noted/wiki/features-list) | [Database Schema](https://github.com/madilippmann/Noted/wiki/database-schema) | [Backend API Routes](https://github.com/madilippmann/Noted/wiki/backend-api-routes) | [Frontend Routes](https://github.com/madilippmann/Noted/wiki/frontend-routes) | [User Stories](https://github.com/madilippmann/Noted/wiki/user-stories) | [Wireframes](https://github.com/madilippmann/Noted/wiki/wireframes) |


## Link to live site

Hosted on Render: [Noted](https://lippmann-noted.onrender.com/)

## Technologies

Noted was built using the following technologies:
<br>
<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="width:75px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:75px;" />



## Getting Started

1. Clone this repo
    * `git clone git@github.com:madilippmann/noted.git`

2. Install dependencies from the root directory
    * `npm install`

3. Create a user in POSTGRESQL with a PASSWORD and CREATEDB permissions
    * `CREATE USER <name> WITH PASSWORD <'password'> CREATEDB`

4. Create a .env file in backend directory modeled off of the .env.example from the backend directory and fill out the respective information.

5. Add a proxy to the package.json file in the frontend directory to match the PORT configuration in the .env file
    * `"proxy": "http://localhost:5050"`

6. Create Database, Migrate, and Seed models
    * `npx dotenv sequelize db:create`
    * `npx dotenv sequelize db:migrate`
    * `npx dotenv sequelize db:seed:all`

7. Start the backend server
    * `npm start`

8. Start the frontend server
    * `npm start`


## Demo
<!-- ### Demo User -->
<!-- TODO -->
<!-- ![Demo User](/public/static/readme-files/demo-login.gif) -->

### Notes
![Note](https://user-images.githubusercontent.com/66145354/158189536-b7ebf9cc-d228-4f13-a920-9c57ec9aacc0.gif)

<!-- ### Notebooks
TODO -->
<!-- ![](/public/static/readme-files/TODO) -->


<!-- ### Tags
TODO -->
<!-- ![](/public/static/readme-files/TODO) -->
