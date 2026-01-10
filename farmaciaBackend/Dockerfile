FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm exec prisma generate
RUN npm run build

EXPOSE 4323

CMD ["node", "dist/index.js"]
