FROM node:22-alpine

RUN apk update && apk add --no-cache tini

COPY . /run/app

WORKDIR /run/app

RUN npm install

ENTRYPOINT [ "tini", "--" ]

CMD [ "node", "/run/app/app.js" ]
