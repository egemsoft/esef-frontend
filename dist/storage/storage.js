'use strict';
/*!
 * esef-frontend - v1.0.4
 * https://github.com/egemsoft/esef-frontend
 * 2014-10-28
 * Copyright (c) 2014 Egemsoft
 * License: MIT
 */

/**
 * @ngdoc overview
 * @name esef.frontend.storage
 * @description
 * Storage module for esef-frontend provides storage service.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.storage', []);

/**
 * @ngdoc service
 * @name esef.frontend.storage.services:storage
 * @description
 * Storage service which stores key/value objects and notifies changes with observer pattern.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.storage').factory('storage', function() {
  var observerCallbacks, storage;
  storage = {};
  observerCallbacks = [];
  return {

    /**
     * @ngdoc object
     * @name store
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Store method for storage. Stores given object with given key. Calls registered callback functions to inform about the change.
     * @param {string} key       - Storage key.
     * @param {object} newValues - Object to be stored on given key.
     * @return {object}          - storage service.
     * @function
     */
    store: function(key, newValues) {
      storage[key] = angular.copy(newValues);
      this.notifyObservers();
      return this;
    },

    /**
     * @ngdoc object
     * @name setProperty
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Set method for single property on given key. Calls registered callback functions to inform about the change.
     * @param {string} key     - Object key.
     * @param {string} propKey - Property key on desired object.
     * @param {string} val     - New value to be set.
     * @return {object}        - storage service.
     * @function
     */
    setProperty: function(key, propKey, val) {
      storage[key][propKey] = angular.copy(val);
      this.notifyObservers();
      return this;
    },

    /**
     * @ngdoc object
     * @name removeProperty
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Remove a single property on given object. Calls registered callback functions to inform about the change.
     * @param {string} key - Object key.
     * @param {string} key - Property key stored on given object key.
     * @return {object}    - storage service.
     * @function
     */
    removeProperty: function(key, propKey) {
      delete storage[key][propKey];
      this.notifyObservers();
      return this;
    },

    /**
     * @ngdoc object
     * @name set
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Set method for storage service. Sets given object as storage.
     * @return {object} - storage service.
     * @function
     */
    set: function(newStorage) {
      storage = angular.copy(newStorage);
      this.notifyObservers();
      return this;
    },

    /**
     * @ngdoc object
     * @name get
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Get method for storage service.
     * @param {string}  key - Key of desired object.
     * @return {object}     - Desired object stored on given key.
     * @function
     */
    get: function(key) {
      return angular.copy(storage[key]);
    },

    /**
     * @ngdoc object
     * @name registerObserverCallback
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Registers callback to observe changes on service.
     * @param {function} callback - Observer callback function
     * @return {object}           - storage service.
     * @function
     */
    registerObserverCallback: function(callback) {
      observerCallbacks.push(callback);
      return this;
    },

    /**
     * @ngdoc object
     * @name notifyObservers
     * @methodOf esef.frontend.storage.services:storage
     * @description
     * Notifies registered observers by running callbacks.
     * @return {object} - Storage service.
     * @function
     */
    notifyObservers: function() {
      angular.forEach(observerCallbacks, function(callback) {
        return callback();
      });
      return this;
    }
  };
});
