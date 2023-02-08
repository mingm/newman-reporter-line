# newman-reporter-slack

A [newman](https://github.com/postmanlabs/newman) reporter for [Line](https://notify-bot.line.me/en/)

newman run

## Installation

```npm install @mingm/newman-reporter-line```

## Usage

### Set the reporter options

Reporter option can be set as environment variables or from reporter options arguments

```sh
export LINE_TOKEN='line-token'
```

### Run newman test with the reporter option `-r line`

```newman run my-collection.postman_collection.json -r cli,line --reporter-line-token 'line-token'```
