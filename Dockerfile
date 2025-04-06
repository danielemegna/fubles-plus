FROM node:18.17.1-slim as sdk-build

WORKDIR /workdir

COPY ./sdk/ .
RUN yarn install
RUN yarn build

########################

FROM fnichol/uhttpd as web-module

COPY ./web/ /www/
COPY --from=sdk-build /workdir/dist/ /www/js/lib

########################

FROM node:18.17.1-slim as backend-module

WORKDIR /workdir/sdk
COPY --from=sdk-build /workdir/package.json .
COPY --from=sdk-build /workdir/dist ./dist

WORKDIR /workdir/backend
COPY ./backend/ .

RUN yarn install --prod
CMD yarn start