ARG NODE_VERSION=20-alpine

# Build stage
FROM node:${NODE_VERSION} AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force

COPY . .

# Run stage
FROM node:${NODE_VERSION}
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app
EXPOSE 4200

CMD ["npm", "start"]
