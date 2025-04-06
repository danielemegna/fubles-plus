# Web frontend module (html/css/js - mobile only)

To browse public html frontend:

1. bundle the sdk js file before (see [SDK README](../sdk/README.md))
2. copy the bundled sdk js file
    ```
    $ cp ../sdk/dist/fubles-plus-sdk.js js/lib/
    ```
3. finally serve the public folder

    ```
    $ docker run --rm -it -p 80:80 -v $PWD/public:/www fnichol/uhttpd
    ```

### # Build SDK & frontend via Dockerfile

Simply run (from repository root folder):

```
$ docker build -t fubles-plus-web -f Dockerfile.web .
$ docker run --rm -dp 80:80 --name fubles-plus-web fubles-plus-web
```

### Backend module (typescript)

See [backend README](./backend/README.md) for details.
