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
angular.module('esef.frontend.pagination').factory('pagination', function () {
  // public api
  return {
    getFixedOffset: function (offset, size, count) {
      return count < offset + size ? count - size : offset;
    },
    getNumberOfPages: function (size, count) {
      var pages = parseInt(count / size);
      if (pages === 0) {
        return pages + 1;
      }
      return pages;
    },
    getCurrentPage: function (offset, size, totalPages) {
      var currentPage = offset / size + 1;
      if (currentPage > totalPages) {
        return totalPages;
      }
      return currentPage;
    },
    getPages: function (currentPage, totalPages, paginationOffset) {
      var start = 1;
      var end = totalPages;
      if (currentPage < paginationOffset + 1) {
        paginationOffset = paginationOffset + (paginationOffset - currentPage);
      } else if (totalPages - currentPage < paginationOffset + 1) {
        paginationOffset = paginationOffset + (paginationOffset - (totalPages - currentPage));
      }
      paginationOffset = paginationOffset;
      if (currentPage - paginationOffset > 0) {
        start = currentPage - paginationOffset;
      }
      if (currentPage + paginationOffset < totalPages) {
        end = currentPage + paginationOffset;
      }
      var pages = [];
      var i;
      for (i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  };
});
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