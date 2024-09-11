ARG NODE_VERSION=20-alpine

# Build stage
FROM node:${NODE_VERSION} AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force
RUN npm install -g @angular/cli
COPY . .
RUN ng build

# Prod stage
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
