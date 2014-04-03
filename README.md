# API tester

A lightweight API tester tool (template).

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
        <!-- add your fields (names converted to keys) -->
        <input type="text" name="q" placeholder="city name">
        <button type="submit">Submit</button>
        <span class="action">Searching by city name</span>
      </form>
    </section>
```

## Demo

http://coming.soon

A simple tester for: http://openweathermap.org/

```html
  <div class="forms" data-url="http://api.openweathermap.org">

    <section>
      <form action="/data/2.5/weather" method="get">
        <input type="text" name="q" placeholder="city name">
        <button type="submit">Submit</button>
        <span class="action">Searching by city name</span>
      </form>
    </section>

    <section>
      <form action="/data/2.5/weather" method="get">
        <input type="text" name="lat" placeholder="latitude">
        <input type="text" name="lon" placeholder="longitude">
        <button type="submit">Submit</button>
        <span class="action">Seaching by geographic coordinats</span>
      </form>
    </section>

    <section>
      <form action="/data/2.5/weather" method="get">
        <input type="text" name="id" placeholder="city ID">
        <button type="submit">Submit</button>
        <span class="action">Seaching by city ID</span>
      </form>
    </section>
```

![Screenshot](https://raw.githubusercontent.com/gaborsar/apitester/master/screenshot.png)

## License
MIT
