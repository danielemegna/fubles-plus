# Fubles Plus SDK Library module (typescript)

Install node dependencies:
```
$ yarn install
```

Run TS type checks:
```
$ yarn tsc
```

Run tests (some tests skipped by default, see below):
```
$ yarn test
```

Api integration tests are skipped by default, to enable them set a valid `TEST_BEARER_TOKEN` environment variable:
```
$ TEST_BEARER_TOKEN=xxxxxxxxxxxxxxxxxx yarn test
```

To bundle the library in a single ES module file (via Vite) ready to be used by browsers:
```
$ yarn build
```

> it generates the bundled sdk js file in dist folder (`fubles-plus-sdk.js` + `index.d.ts`)

Watch can be useful during development to automatically regenerate lib js files on changes:
```
$ yarn watch
```

> it auto regenerates the js file under public folder \
> _note: tsc checks not performed on rebuild_

