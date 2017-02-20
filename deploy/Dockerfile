FROM mhart/alpine-node:7

RUN apk add --no-cache git

ENV home /root
ENV app ${home}/app

COPY server/package.json ${app}/server/package.json
WORKDIR ${app}/server/
RUN npm install

COPY client/package.json ${app}/client/package.json
WORKDIR ${app}/client/
RUN npm install

COPY client/ ${app}/client/
WORKDIR ${app}/client/
RUN npm run build
RUN mv ${app}/client/public /tmp/public; rm -rf ${app}/client/* ; mv /tmp/public ${app}/client/public

COPY server/ ${app}/server/
WORKDIR ${app}/server/
CMD npm start