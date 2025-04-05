FROM node:18.17.1-slim

WORKDIR /app
COPY . /app

# fubles-plus sdk part
RUN yarn install
RUN yarn build

# fubles-plus backend part
WORKDIR /app/backend
RUN yarn install --prod

CMD yarn start
