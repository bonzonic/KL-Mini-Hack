FROM node:latest as build

# Update and install nodejs
RUN apt update
RUN apt install nodejs -y

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/

RUN npm install

ENV PORT 5173

EXPOSE 5173

CMD [ "npm", "run", "dev"]