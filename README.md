# API tester

A lightweight API tester tool.

http://apitester.artoon.hu

## Demo project

Some simple forms for: http://api.openweathermap.org

```json
[
  {
    "url": "http://api.openweathermap.org/data/2.5/weather",
    "method": "get",
    "label": "Searching by city name",
    "fields": [
      {
        "name": "q",
        "label": "city name"
      }
    ],
    "data": {
      "q": "default city name value ..."
    }
  },
  {
    "url": "http://api.openweathermap.org/data/2.5/weather",
    "method": "get",
    "label": "Seaching by geographic coordinats",
    "fields": [
      {
        "name": "lat",
        "label": "latitude"
      },
      {
        "name": "lon",
        "label": "longitude"
      }
    ],
    "data": {}
  },
  {
    "url": "http://api.openweathermap.org/data/2.5/weather",
    "method": "get",
    "label": "Seaching by city ID",
    "fields": [
      {
        "name": "id",
        "label": "city ID"
      }
    ],
    "data": {}
  }
]
```

## License
MIT
