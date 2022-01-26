FROM node:16

WORKDIR /home/mohamed/Projects/chat-app


COPY package*.json ./
RUN npm install
# RUN npx prisma generate remember to add them to create a working image
# RUN npx prisma migreate

COPY . .


ENV 8080=5500

EXPOSE 5500

CMD [ "npm","start" ]

