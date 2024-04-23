FROM node:20-alpine
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
COPY package*.json ./
# USER root
# RUN chown -R app:app .
RUN npm install
COPY . . 
EXPOSE 4000 
# USER app
CMD ["node", "server.js"]