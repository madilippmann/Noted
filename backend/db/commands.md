npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,hashedPassword:string

npx sequelize model:generate --name Note --attributes userId:integer,title:string,content:text,notebookId:integer

npx sequelize model:generate --name Notebook --attributes userId:integer,title:string


npx dotenv sequelize db:migrate

<!-- For undoing migrations -->
npx dotenv sequelize db:migrate:undo

<!-- Seeder file for demo user -->
npx sequelize seed:generate --name demo-user
npx sequelize seed:generate --name notesSeed
npx sequelize seed:generate --name notebooksSeed


npx dotenv sequelize db:seed:all

<!-- Undo last seed migration -->
npx dotenv sequelize db:seed:undo
<!-- Undo all seed migrations -->
npx dotenv sequelize db:seed:undo:all


ADD NOTEBOOK ASSOCIATIONS TO NOTES
EVENTUALLY NOTEBOOKS NEEDS TO BE SEEDED BEFORE NOTES
