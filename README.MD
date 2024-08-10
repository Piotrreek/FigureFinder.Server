To run the application execute following steps:
 - Create `.env` file with `DATABASE_URL="postgresql://user:password@localhost:5434/FigureFinder"`
 - `npm install`
 - `npx prisma generate`
 - `docker compose up -d`
 - `npx prisma migrate dev`
 - `npm run start`