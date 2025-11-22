# Fubles Plus

Better explore your Fubles stats and automate some Fubles operations!


The idea is to leverege on the exposed API (non-official, the currently used by the real frontend) to better visualize stats, events, ecc.
Furthermore, same API can be used to autmatically perform some scheduled operation like enrollment or unrollement following some rules.

## Feature ideas

#### # Flash enrollment :construction_worker:

Given a full match I'm not enrolled to, auto-enroll me immediately when a seat is available.

Variations:
- parametrize maximum datetime to be enrolled
- enroll me only if the free seat is in the specified team
- enroll me only if I can play with a specific team mate
- do not autoenroll, just notify

Progress of work :construction_worker::
- :white_check_mark: needed SDK operation
- :white_check_mark: frontend mockup
- :construction_worker: backend api of monitorized matches (currently fake data)
- :warning: missing monitoring daemon

#### # Flash side switch

Given a full match I'm enrolled to, automatically change team when a spot became available in the other team.

Variations:
- do not autoswitch, just notify

#### # Auto unsubcribe

Given a match I'm enrolled to, if the prediction is too unbalanced close to the deadline to unsubscribe, auto unroll me.

Variations:
- configure unbalance value
- do not auto unroll, just notify

#### # Notify interesting match

Notify me when there is a new interesting match.

Versions:
- a "good" number (3-4) of followed users are enrolled in a match
- a new match is created in a day and time I'm interested in

Variations:
- parametrize number of followed users

#### # Almost full match notification

Select a not full match I'm not enrolled to and notify me (mail) when it is almost full (eg. 2 seat available)

Variations:
- parametrize number of seat available
- autoenroll me when almost full
- autoenroll only when my google calendar is free

#### # Calendar sync :white_check_mark:

Create a public browsable calendar (.ics format) putting events of matches I'm enrolled to.
Calendar events should contain:
- venue with the right sport center
- match date and time
- match fubles link in notes
- notifications set to some hours before the match

> :construction_worker: to complete usage with another used-id !

#### # User recent performances :white_check_mark:

Given a player, show some additional statistics on last N played matches:
- match outcome (winner/lost)
- <s>number of goals</s>
- average votes

#### # Peek votes without voting :white_check_mark:

Given a recent match that I played, I want to see votes players gave to me without voting.

> in fubles you cannot see votes without giving your votes before

#### # Show level variation :construction_worker:

Given some recent matches that I played, I want to see the level variation caused by that match.

> this information is never shown by fubles but present as `level_variation` in api payload!

Progress of work :construction_worker::
- :white_check_mark: frontend mockup
- :warning: needed SDK operation
- :warning: dynamic fronted based on real values

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
