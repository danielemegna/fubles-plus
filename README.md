# Fubles Plus
Automate your Fubles operations

## Goal

(to be completed)

## Ideas

Some features that we could implement below.

#### Flash enrollment

Given a full match I'm not enrolled to, auto-enroll me immediately when a seat is available.

Variations:
- parametrize maximum datetime to be enrolled
- enroll me only if the free seat is in the specified team
- enroll me only if I can play with a specific team mate
- do not autoenroll, just notify

#### Flash side switch

Given a full match I'm enrolled to, automatically change team when a spot became available in the other team.

Variations:
- do not autoswitch, just notify

#### Auto unsubcribe

Given a match I'm enrolled to, if the prediction is too unbalanced close to the deadline to unsubscribe, auto unroll me.

Variations:
- configure unbalance value
- do not auto unroll, just notify

#### User recent performances

Given a player, show some additional statistics on last N played matches:
- match outcome (winner/lost)
- number of goals
- average votes

#### Almost full match notification

Select a not full match I'm not enrolled to and notify me (mail) when it is almost full (eg. 2 seat available)

Variations:
- parametrize number of seat available
- autoenroll me when almost full
- autoenroll only when my google calendar is free

#### Google calendar sync

Sync my google calendar putting events of matches I'm enrolled to.

Created google calendar event should contain:
- venue with the right sport center
- match date and time
- match fubles link in notes
- notifications set to some hours before the match

Variation:
- select the g calendar you want to use

#### Notify interesting match

Notify me when there is a new interesting match.

Versions:
- a "good" number (3-4) of followed users are enrolled in a match
- a new match is created in a day and time I'm interested in

Variations:
- parametrize number of followed users

#### Peek votes without voting

Given a recent match that I played, I want to see votes players gave to me without voting.

> in fubles you cannot see votes without giving your votes before

## Dev notes

### Library part (typescript)

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

To run api integration tests set a valid `TEST_BEARER_TOKEN` environment variable before:
```
$ export TEST_BEARER_TOKEN=xxxxxxxxxxxxxxxxxx
$ yarn test
```

To bundle the library in a single ES module file (via Vite) ready to be used by browsers:
```
$ yarn build
```

> it generates the file `public/js/lib/fubles-plus.js`

### HTML public part (html/css/js - mobile only)

To browse public html pages, bundle the library before (see above) and than serve the public folder:

```
$ docker run --rm -it -p 80:80 -v $PWD/public:/www fnichol/uhttpd
```

> browse http://localhost

### Backend part (typescript)

See [backend README](./backend/README.md) for details.
