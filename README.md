# react-winjs

[![Greenkeeper badge](https://badges.greenkeeper.io/flyve-mdm/react-winjs.svg)](https://greenkeeper.io/)

A React wrapper around WinJS's controls. Implemented using the technique described on [this WinJS wiki page](https://github.com/winjs/winjs/wiki/Using-WinJS-with-React).

  - [Documentation](https://github.com/winjs/react-winjs/wiki/Documentation)
  - [Live Component Library](https://brand.ai/styleguide/WinJS)

Live demos:
  - [Showcase](http://winjs.github.io/react-winjs/examples/showcase/index.html) ([source](https://github.com/winjs/react-winjs/tree/master/examples/showcase)): shows an example usage of each component.
  - [Movies](http://winjs.github.io/react-winjs/examples/movies/index.html) ([source](https://github.com/winjs/react-winjs/tree/master/examples/movies)): demonstrates a couple of react-winjs components in a small app for looking up movies.
  - [Address Book](http://winjs.github.io/react-winjs/examples/address-book/index.html) ([source](https://github.com/winjs/react-winjs/tree/master/examples/address-book)): demonstrates how to use react-winjs components to build an adaptive app which works well on mobile, tablet, and desktop computers.

## Installation

```
npm install react-winjs --save
```

## Usage

Include [WinJS 4.4](http://try.buildwinjs.com/#get) on your page. For example:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/winjs/4.4.0/css/ui-dark.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/winjs/4.4.0/js/base.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/winjs/4.4.0/js/ui.js"></script>
```

Then require `react-winjs` and use it:

```jsx
var React = require('react');
var ReactDOM = require('react-dom');
var ReactWinJS = require('react-winjs');

var App = React.createClass({
  render: function () {
    return <ReactWinJS.Rating maxRating={3} />;
  }
});

ReactDOM.render(<App />, document.getElementById("app"));
```

See the [documentation](https://github.com/winjs/react-winjs/wiki/Documentation) and [examples](https://github.com/winjs/react-winjs/tree/master/examples) for more details.

## License

MIT
