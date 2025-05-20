FROM node:18-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json tailwind.config.js postcss.config.js vite.config.ts index.html ./
COPY src ./src
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
