FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ✅ Add this line to generate Prisma client inside Docker
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "index.js"]
