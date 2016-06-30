# v-store
A javascript key value store with pub-sub.

## Install
```node
npm install v-store --save
```

### Store
```javascript
// Create your store (books.js)

var Books = require('v-store');

module.exports = Books;

```

### Example

```javascript

// Usage

var store = require('./books'); // Path to your store (books.js)

var print = function (newChapter, oldChapter) {
    console.log('From: ', oldChapter, ' to: ', newChapter);
};

store.set('name', 'A Song of ice and fire');
store.set('chapter', 1);

// Subscriber to whenever the value of chapter changes.
store.subscribe('chapter', print);

// Set the value and trigger any subscribers.
store.set('chapter', 2); // Calls print and logs => From: 1 to: 2

// Remove print subscriber. 
// If the second argument is not specified then all subscribers are removed.
store.unsubscribe('chapter', print);

// Reset the store
store.flush();
```