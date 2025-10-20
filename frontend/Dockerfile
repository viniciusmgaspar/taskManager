FROM node:18-alpine

WORKDIR /workspace/frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "npm run dev -- --host"]
