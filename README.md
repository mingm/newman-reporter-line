# newman-reporter-line

A [newman](https://github.com/postmanlabs/newman) reporter for [Line](https://notify-bot.line.me/en/)

newman run

## Installation

```npm install -g newman-reporter-line```

## Usage

### Set the reporter options

Reporter option can be set as environment variables or from reporter options arguments

```sh
export LINE_TOKEN='line-token'
export LINE_SUMMARY='true/false'
export LINE_RESULT='true/false'
```

### Run newman test with the reporter option `-r line`

```newman run my-collection.postman_collection.json -r cli,line --reporter-line-token 'line-token' --reporter-line-summary true --reporter-line-result true```
