FROM node:20-bullseye
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (dev + prod)
RUN npm install

# Copia o restante do código
COPY . .

# Copy entrypoint script and make it executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Build do NestJS
RUN npx nest build

# Gera Prisma Client
RUN npx prisma generate


# Expondo porta da aplicação
EXPOSE 3000

# Use entrypoint to wait for DB and apply schema, then start the app
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "start:dev"]