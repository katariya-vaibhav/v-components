FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=deps /app ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]





# FROM node:22.11.0-alpine

# WORKDIR /app

# COPY package*.json ./

# COPY tsconfig*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD npm run dev