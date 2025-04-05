# Fubles Plus - Backend side

Backend server part composed by two main parts:

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

Run main entrypoint:
```
$ yarn start
```

Or watch to use autoreload during develoment:
```
$ yarn watch
```

> api served on http://localhost:4321
