# fluxer.js

Powerful front-end framework for Flux unidirectional data flow. Flux is announced by Facebook, which is next generation design pattern for front-end development.

[![NPM](https://nodei.co/npm/fluxerjs.png)](https://nodei.co/npm/fluxerjs/)

## Installation

Install fluxer.js via NPM:
```
npm install fluxerjs
```

Note that fluxer.js using `require` and `EventEmitter` of Node.js, you must have browserify to make it work for front-end. purpose.

### Usage

In the past, Lack of framework for Flux pattern. if we want to use Flux, we must know exactly parts: the ___dispatcher___, the ___actions___, the ___stores___, and the ___views___. With `flux` NPM Module which is provided by Facebook, rough implementation is not easy to use.

But now, writing a Flux application is quite easy with fluxer.js framework, just like MVC architecture if task is not complicated. Developer is able to focus on ___stores___ and ___views___, no need to take care and take time on ___dispatcher___ and ___actions___.

Here is a simple code to show how to write a Flux application with fluxer.js:
```js
var Fluxer = require('fluxerjs');
var React = require('react');

// Creating Actions with a given name
var cartActions = Fluxer.createActions('ShoppingCart', [
  'Create',
  'Delete'
]);

// Create Store with a given name
var cartStore = Fluxer.createStore('CartStore');
var _items = {};

cartStore.getAll = function() {
  return _items;
};

Fluxer.on('ShoppingCart.Create', function(productId) {
  // Adding product to shopping cart via Restful API
  $.post('/apis/cart', { id: productId }, function(data) {
  
    // Storing state
    _items[productId] = data;
    
    // Notify react components (view) that requires updating
    this.emit('change');
  });
});
Fluxer.on('ShoppingCart.Delete', function(productId) {

  // Remove product from shopping cart via Restful API
  $.delete('/apis/cart/' + productId, function() {
  
    delete _items[productId];
  
    // Notify react components (view) that requires updating
    this.emit('change');
  });
  
});

// React component (view)
var ShoppingApp = React.createClass({
  getInitialState: function() {
    // preparing state to initialize component
    return {
      carts: store.getAll();
    };
  },
  componentDidMount: function() {
    store.on('change', this._onChange);
  },
  componentWillUnmount: function() {
    store.removeListener('change', this._onChange);
  },
  render: function() {
    // Template for React
  },
  _onChange: function() {
      // Updating state
      this.setState({
        carts: store.getAll();
      });
  },
  _onCreate: function(ProductId) {
    // Call action to create a new item to cart
    cartAction.Create(productId);
  }
});
```

### Actions Customization

By default, actions will fire the event with the action name of itself, but it should be able to fire one or more events in one triggered action rather than one-to-one relationship. In fluxer.js, it is possible to customize actions for triggering specific store in runtime. Just replacing action handler for this purpose, then you can use `this.$emit` to fire the event what you want instead of origin.

Here is an example:
```js
var cartActions = Fluxer.createActions('ShoppingCart', [
  'Create',
  'Delete'
]);

// We can listen to Fluxer for "ShoppingCart.Unselect" and "ShoppingCart.Select"
actions.toggleSelect = function(product) {
  if (product.selected)
    this.$emit('Unselect');
  else
    this.$emit('Select');
};

```

## Demo

Just like other front-end framework, fluxer.js has an TodoMVC example for demostration.

Change working directory then initializing and starting it with NPM command:
```
cd examples/todomvc/
npm install
npm start
```

Now you can open `index.html` with browser.

## Authors

Copyright(c) 2015 Fred Chien <<cfsghost@gmail.com>>

## License

Licensed under the MIT License
