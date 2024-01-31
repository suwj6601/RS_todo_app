FROM node:18.16.0-alpine

WORKDIR /app
COPY . .

EXPOSE 4400

# CMD ["yarn", "dev"]