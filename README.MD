## Correr Server (Backend)

Levantar el contenedor abriendo docker desktop y en /cinemaestro: docker-compose up -d
luego cd backend y en la terminal: npm run devStart

## Correr Cliente (Frontend)

cd frontend, luego en la terminal: npm run dev

## Para ejecutar system tests

Instalar cypress: npm install cypress --save-dev

1. Ir a frontend (cd frontend) y correr: npx cypress open
luego en cypress ir a E2E Testing

2. Correr en la terminal: Ir a frontend (cd frontend)
luego: npx cypress run --spec "$(Get-Content .\sysTests.txt -Raw)"

## Unit testing frontend

1. cd frontend/ npm install

2. cd frontend/ npm test

