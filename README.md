# Fubles Plus
Automate your Fubles operations

## Goal

(to be completed)

## Ideas

Some features that we could implement below.

#### Flash enrollment

Select a full match I'm not enrolled to and auto-enroll me immediately when a seat is available.

Variations:
- enroll me only if the free seat is in the specified team
- enroll me only if I can play with a specific team mate

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

#### Flash side switch

Given a full match I'm enrolled to, automatically change team when a spot became available in the other team.

Variations:
- do not autoswitch, just notify

#### Peek votes without voting

Given a recent match that I played, I want to see votes players gave without voting.

> in fubles you cannot see votes without giving your votes before

## Dev notes

Run tests with:
```
$ yarn test
```

To run api integration tests set a valid `TEST_BEARER_TOKEN` environment variable:

```
$ export TEST_BEARER_TOKEN=xxxxxxxxxxxxxxxxxx
$ yarn test
```

#### Next tiny steps

- [x] Read list of played matches
- [x] Get match available slots by side
- [ ] Find out how to use this modules client-side
