# TodoListReact

Этот TodoList разработан с использованием React

Рекомендуемые версии node > **18.19.0**

## Установка

npm install

## Запуск БД

1. Перейдите в папку NodeDB
2. Запустите сервер при помощи команды
   npm run dev

По умолчанию сервер будет запущен на порту 3000

Для работы с БД вам необходимо создать .env файл с настройками(NODE_ENV, PORT, DATABASE_URL).
Для PostgreSQL замените PASSWORD && DBNAME
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DBNAME?schema=public"

## Запуск

npm run start

## Запуск тестов

npm run test

## Используемые технологии

Frontend

- React
- HTML
- CSS
- Typescript

Backend

- Node
- Express
- PostgreSQL
- Prisma ORM
