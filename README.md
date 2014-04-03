# API tester

A lightweight API tester template.

## Usage

Modify your index.html as:

```html
  <!-- data-url : base URL you would like to test -->
  <div class="forms" data-url="http://api.openweathermap.org">

    <!-- add your forms -->
    <!-- action : path you would like to test -->
    <!-- method : HTTP method your API expects -->
    <!-- submit button : leave as it is -->
    <!-- span.action : Just a label, describes your form -->
    <section>
      <form action="/data/2.5/weather" method="get">
        <!-- add your fields (names are important) -->
        <input type="text" name="q" placeholder="city name">
        <button type="submit">Submit</button>
        <span class="action">Searching by city name</span>
      </form>
    </section>
```

## Demo

http://coming.soon
A simple tester for: http://openweathermap.org/

![Screenshot](https://raw.githubusercontent.com/gaborsar/apitester/master/screenshot.png)
