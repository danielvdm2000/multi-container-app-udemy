FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist /dist

CMD ["npm", "run", "start"]