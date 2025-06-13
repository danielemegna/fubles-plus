#!/bin/sh

git pull --rebase --autostash

docker rm -f fubles-plus-be || true
docker rm -f fubles-plus-web || true

# needed to claim space in small servers
docker rmi fubles-plus-be || true
docker rmi fubles-plus-web || true

docker build -t fubles-plus-web --target web-module . 
docker build -t fubles-plus-be --target backend-module . 

docker run --rm             -dp 8080:80   --name fubles-plus-web fubles-plus-web
docker run --restart=always -dp 4321:4321 --name fubles-plus-be  -e FUBLES_BEARER_TOKEN=$FUBLES_BEARER_TOKEN fubles-plus-be
