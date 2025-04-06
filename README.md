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

To detailed instructions regardings the project modules

- SDK Library module (typescript) see [SDK README](./sdk/README.md)
- Web frontend module (html/css/js - mobile only) see [web README](./web/README.md)
- Backend module (typescript) see [backend README](./backend/README.md)

### # Build and run via docker

Build web and backend images with:

```
$ docker build -t fubles-plus-web --target web-module . 
$ docker build -t fubles-plus-be --target backend-module . 
```

Then run them:

```
$ docker run --rm -dp 8080:80 --name fubles-plus-web fubles-plus-web
$ docker run --rm -dp 4321:4321 --name fubles-plus-be fubles-plus-be
```
