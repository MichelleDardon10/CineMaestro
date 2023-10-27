## Correr Server (Backend)

Levantar el contenedor abriendo docker desktop y en /cinemaestro: docker-compose up -d
luego cd backend y en la terminal: npm run devStart

## Correr Cliente (Frontend)

cd frontend, luego en la terminal: npm run dev

## Para migrar base de datos

Ir a backend (cd backend ) y correr: npx sequelize-cli db:migrate
