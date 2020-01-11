# LATEST NODE Version to use for our application
FROM node:11
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY package.json /usr/src
RUN npm install
COPY . /usr/src
EXPOSE 3000
CMD ["npm", "start"]
