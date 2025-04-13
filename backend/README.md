# Fubles Plus - Backend side

Backend server module composed by two main parts:

- a basic http API server to
  - store and retrieve fubles-plus user data
  - serve the ics calendar of the next user matches
- a deamon loop that checks for new job to be accomplished

## Dev notes

Install node dependencies:
```
$ yarn install
```

Run TS type checks:
```
$ yarn tsc
```

Run tests:
```
$ yarn test
```

Run main entrypoint:
```
$ yarn start
```

> you need to export `FUBLES_BEARER_TOKEN` env variable before<br/>
> `export FUBLES_BEARER_TOKEN=xxxxx`

Use watch to use autoreload during development:
```
$ yarn watch
```

> api served on http://localhost:4321

If you need to update sdk module to the latest local version:

```
$ yarn upgrade fubles-plus-sdk --latest
```

> build the sdk before, see [sdk README](../sdk/README.md)

## Build to ship with docker

:warning: Run from root repository folder:

```
$ docker build -t fubles-plus-be --target backend-module . 
$ docker run --rm -dp 4321:4321 --name fubles-plus-be fubles-plus-be
```
