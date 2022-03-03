npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,hashedPassword:string

npx dotenv sequelize db:migrate

<!-- For undoing migrations -->
npx dotenv sequelize db:migrate:undo

<!-- Seeder file for demo user -->
npx sequelize seed:generate --name demo-user


npx dotenv sequelize db:seed:all

<!-- Undo last seed migration -->
npx dotenv sequelize db:seed:undo
<!-- Undo all seed migrations -->
npx dotenv sequelize db:seed:undo:all
