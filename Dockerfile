FROM node:boron-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./build /usr/src/app/
RUN npm install

# Bundle app source
COPY ./build /usr/src/app

RUN adduser -D app && chown -R app /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
