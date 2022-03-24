FROM node:17

WORKDIR /elec-meter

COPY package.json /elec-meter/package.json

RUN yarn install

COPY . /elec-meter

CMD [ "yarn","start:debug"]