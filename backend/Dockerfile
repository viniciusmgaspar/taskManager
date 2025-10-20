FROM node:20-bullseye
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (dev + prod)
RUN npm install

# Copia o restante do código
COPY . .


# Build do NestJS
RUN npx nest build

# Gera Prisma Client
RUN npx prisma generate


# Expondo porta da aplicação
EXPOSE 3000

CMD ["npm", "run", "start:dev"]