FROM node:18.17.1-slim as node-build

WORKDIR /build
COPY . /build

RUN yarn install
RUN yarn build

########################

FROM fnichol/uhttpd

COPY --from=node-build /build/public/ /www/

