FROM node:14
WORKDIR /app
COPY . .
RUN npm install && npm run serve

# FROM nginx
# RUN mkdir /app
# COPY --from=0 /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf
