var Store = function () {
  this.data = {};
};

Store.prototype.get = function (key) {
  return this.data[key] && this.data[key].value;
};

Store.prototype.set = function (key, value) {
  if (!key) {
    return;
  }
  this.data[key] = this.data[key] || {};
  var oldValue = this.data[key].value;
  this.data[key].value = value;
  if (this.data[key].callbacks && (oldValue !== value)) {
    this.data[key].callbacks.forEach(function (callback) {
      callback(value, oldValue);
    });
  }
};

Store.prototype.subscribe = function (key, callback) {
  if (!key || typeof callback !== 'function') {
    return;
  }

  this.data[key] = this.data[key] || {};
  if (this.data[key].callbacks) {
    this.data[key].callbacks.push(callback);
  } else {
    this.data[key].callbacks = [callback];
  }
};

Store.prototype.unsubscribe = function (key, callback) {
  if (!key) {
    return;
  }
  if (this.data[key] && this.data[key].callbacks) {
    if (callback) {
      this.data[key].callbacks = this.data[key].callbacks.filter(function (item) {
        return item !== callback;
      });
    } else {
      this.data[key].callbacks = null;
    }
  }
};

Store.prototype.flush = function () {
  this.data = {};
};

module.exports = new Store();