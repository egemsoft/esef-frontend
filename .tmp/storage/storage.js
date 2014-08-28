'use strict';
/*!
 * esef-frontend - v1.0.0
 * https://github.com/egemsoft/esef-frontend
 * 2014-08-28
 * Author: İsmail Demirbilek
 * Copyright (c) 2014 Egemsoft * License: MIT
 */
angular.module('esef.frontend.storage', []);
angular.module('esef.frontend.storage').factory('storage', function () {
  var storage = {};
  var observerCallbacks = [];
  return {
    store: function (key, newValues) {
      storage[key] = newValues;
      // call registered observers
      this.notifyObservers();
      return this;
    },
    setProperty: function (key, propKey, val) {
      storage[key][propKey] = val;
      // call registered observers
      this.notifyObservers();
      return this;
    },
    removeProperty: function (key, propKey) {
      delete storage[key][propKey];
      // call registered observers
      this.notifyObservers();
      return this;
    },
    set: function (newStorage) {
      storage = newStorage;
      this.notifyObservers();
      return this;
    },
    get: function (key) {
      return storage[key];
    },
    registerObserverCallback: function (callback) {
      observerCallbacks.push(callback);
      return this;
    },
    notifyObservers: function () {
      angular.forEach(observerCallbacks, function (callback) {
        callback();
        return this;
      });
    }
  };
});