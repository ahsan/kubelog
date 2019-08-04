FROM node:10.16-alpine

COPY package.json /tmp/
COPY package-lock.json /tmp/

RUN cd /tmp && mkdir node_modules && npm install --loglevel warn
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app
COPY . /opt/app

RUN npm run build
RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build"]