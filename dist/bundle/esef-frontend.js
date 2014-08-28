'use strict';
/*!
 * esef-frontend - v1.0.0
 * https://github.com/egemsoft/esef-frontend
 * 2014-08-28
 * Author: İsmail Demirbilek
 * Copyright (c) 2014 Egemsoft * License: MIT
 */

angular.module('esef.frontend', [
    'esef.frontend.storage',
    'esef.frontend.pagination'
  ]);
angular.module('esef.frontend.pagination', []);

angular.module('esef.frontend.pagination')
  /**
   * @ngdoc service
   * @name lolWebapp.services:pagination
   * @description
   * Pagination helper service. Makes calculations for current page, offset fix, number of pages and displayed page numbers.
   * @function
   * @author İsmail Demirbilek
   */
  .factory('pagination', function() {
    // public api
    return {

      /**
       * @ngdoc object
       * @name getFixedOffset
       * @methodOf lolWebapp.services:pagination
       * @description
       * Fixes data offset if it is beyond the count + active page size.
       * @param {number} offfset    - Data offset.
       * @param {number} size       - Number of entries displayed on each page.
       * @param {number} count      - Total data count.
       * @return {number}           - Fixed offset.
       * @function
       */
      getFixedOffset: function(offset, size, count) {
        return (count < (offset + size)) ? (count - size) : offset;
      },

      /**
       * @ngdoc object
       * @name getNumberOfPages
       * @methodOf lolWebapp.services:pagination
       * @description
       * Returns total number of pages.
       * @param {number} size       - Number of entries displayed on each page.
       * @param {number} count      - Total data count.
       * @return {number}           - Number of pages.
       * @function
       */
      getNumberOfPages: function(size, count) {
        var pages = parseInt(count / size);
        if(pages === 0) {
          return pages+1;
        }
        return pages;
      },

      /**
       * @ngdoc object
       * @name getNumberOfPages
       * @methodOf lolWebapp.services:pagination
       * @description
       * Calculates and returns current page number.
       * @param {number} offfset    - Data offset.
       * @param {number} size       - Number of entries displayed on each page.
       * @param {number} totalPages - Total number of pages.
       * @return {number}           - Active page number.
       * @function
       */
      getCurrentPage: function(offset, size, totalPages) {
        var currentPage = (offset / size) + 1;
        if(currentPage > totalPages) {
          return totalPages;
        }
        return currentPage;
      },

      /**
       * @ngdoc object
       * @name getPages
       * @methodOf lolWebapp.services:pagination
       * @description
       * Calculates displayed page numbers and constructs them in an array.
       * @param {number} currentPage       - Active page number being displayed.
       * @param {number} totalPages        - Total number of pages.
       * @param {number} paginationOffset  - Number of pages to be displayed beginning from current page on left and right.
       * @return {array}                   - Page numbers array.
       * @function
       */
      getPages: function(currentPage, totalPages, paginationOffset) {
        var start = 1;
        var end = totalPages;
        if(currentPage < paginationOffset + 1) {
          paginationOffset = paginationOffset + (paginationOffset - currentPage);
        }
        else if(totalPages - currentPage < paginationOffset + 1) {
          paginationOffset = paginationOffset + (paginationOffset - (totalPages - currentPage));
        }
        paginationOffset = paginationOffset;
        if(currentPage - paginationOffset > 0) {
          start  = currentPage - paginationOffset;
        }
        if(currentPage +  paginationOffset < totalPages) {
          end = currentPage + paginationOffset;
        }
        var pages = [];
        var i;
        for(i = start; i <= end; i++) {
          pages.push(i);
        }
        return pages;
      }
    };
  });
angular.module('esef.frontend.storage', []);

angular.module('esef.frontend.storage')
  /**
   * @ngdoc service
   * @name esef.frontend.storage.services:storage
   * @description
   * Storage service which stores key/value objects and notifies changes with observer pattern.
   * @function
   * @author İsmail Demirbilek
   */
  .factory('storage', function() {
    var storage = {};
    var observerCallbacks = [];
    return {
      /**
       * @ngdoc object
       * @name set
       * @methodOf esef.frontend.storage.services:storage
       * @description
       * Store method for storage. Stores given object with given key. Calls registered callback functions to inform about the change.
       * @param {string} key       - Storage key.
       * @param {object} newValues - Object to be stored on given key.
       * @return {object}          - storage service.
       * @function
       */
      store: function(key, newValues) {
        storage[key] = newValues;
        // call registered observers
        this.notifyObservers();
        return this;
      },

      /**
       * @ngdoc object
       * @name setFilter
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
        storage[key][propKey] = val;
        // call registered observers
        this.notifyObservers();
        return this;
      },

      /**
       * @ngdoc object
       * @name removeFilter
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
        // call registered observers
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
        storage = newStorage;
        this.notifyObservers();
        return this;
      },

      /**
       * @ngdoc object
       * @name get
       * @methodOf esef.frontend.storage.services:storage
       * @description
       * Get method for storage service.
       * @return {string} - Desired object stored on given key.
       * @function
       */
      get: function(key) {
        return storage[key];
      },
      
      /**
       * @ngdoc object
       * @name registerObserverCallback
       * @methodOf esef.frontend.storage.services:storage
       * @description
       * Registers callback to observe changes on service
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
        angular.forEach(observerCallbacks, function(callback){
          callback();
          return this;
        });
      }
    };
  });