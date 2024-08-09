FROM node:latest

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .

RUN npm install
RUN npm install --save-dev @types/node

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:prod"]