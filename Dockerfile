FROM node:14.15.1-alpine
ARG API_URL

# Create app directory
RUN mkdir /opt/app && chown node:node /opt/app

RUN apk add --update git && \
rm -rf /tmp/* /var/cache/apk/*

WORKDIR /opt/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY webpack*.js ./

# Babel 7 presets and plugins
COPY babel.config.js ./

# Bundle app source
COPY src ./src

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node

# Run the scripts defined in package.json
RUN npm install && \ 
API_URL=$API_URL npm run build

EXPOSE 3001

# Express server handles the backend functionality and also serves the React app
CMD ["node", "/opt/app/dist/server"]
