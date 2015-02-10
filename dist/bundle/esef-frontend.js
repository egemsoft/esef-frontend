'use strict';
/*!
 * esef-frontend - v1.0.6
 * https://github.com/egemsoft/esef-frontend
 * 2015-02-10
 * Copyright (c) 2015 Egemsoft
 * License: MIT
 */

/**
 * @ngdoc overview
 * @name esef.frontend
 * @requires esef.frontend.pagination
 * @requires esef.frontend.storage
 * @description
 * Main module holding everything together.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend', ['esef.frontend.storage', 'esef.frontend.pagination', 'esef.frontend.refresh', 'esef.frontend.filters', 'esef.frontend.notification']);

/**
 * @ngdoc overview
 * @name esef.frontend.filters
 * @description
 * Provides handy filters
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.filters', []);

/**
 * @ngdoc filter
 * @name esef.frontend.filters.filters:titlecase
 * @description
 * Title case filter. Change text case to title format, first character will be uppercase and the rest will be lowercase.
 * @param {string} text - Input string.
 * @return {string}     - Title cased result string.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.filters').filter('titlecase', function() {
  return function(text) {
    var lowercased;
    if (text === null || text === void 0) {
      text = '';
    }
    lowercased = text.toString().toLocaleLowerCase();
    return lowercased[0].toLocaleUpperCase().concat(lowercased.substr(1, lowercased.length - 1));
  };
});

/**
 * @ngdoc overview
 * @name esef.frontend.notification
 * @description
 * Dialog and notification services.
 * @function
 */
angular.module('esef.frontend.notification', ['ui.bootstrap.modal']).run([
  '$templateCache', function($templateCache) {
    return $templateCache.put('notification/views/confirm-dialog.html', '<div class="modal-body"> <h4 class="modal-title"> <i class="fa fa-comment"></i> {{ title }} </h4> <hr/> <p translate>{{ message }}</p> <div class="text-right"> <button type="button" class="btn btn-default" ng-click="$close(false)">{{ options.cancelLabel }}</button> <button type="button" class="btn btn-danger" ng-click="$close(true)">{{ options.yesLabel }}</button> </div> </div>');
  }
]);

/**
 * @ngdoc service
 * @name esef.frontend.notification.services:esefNotify
 * @description
 * Dialog and notification services.
 * @function
 */
angular.module('esef.frontend.notification').factory('esefNotify', function($modal) {
  return {

    /**
     * @ngdoc object
     * @name confirm
     * @methodOf esef.frontend.notification.services:esefNotify
     * @param {string} title    - Confirm dialog title.
     * @param {string} message  - Confirm dialog body message.
     * @param {string=} options - Confirm dialog options. Includes `yesLabel` and 'cancelLabel'.
     * @return {object}         - Modal instance result (promise) to be resolved with confirm status (true | false).
     * @description
     * Creates a confirm dialog with ui-bootstrap's modal, opens it and returns its' instance result.
     * @function
     */
    confirm: function(title, message, options) {
      return $modal.open({
        templateUrl: 'notification/views/confirm-dialog.html',
        size: 'sm',
        controller: function($scope, title, message, options) {
          $scope.title = title;
          $scope.message = message;
          $scope.options = angular.extend({
            yesLabel: 'Yes',
            cancelLabel: 'Cancel'
          }, options);
          return null;
        },
        resolve: {
          title: function() {
            return title;
          },
          message: function() {
            return message;
          },
          options: function() {
            return options;
          }
        }
      }).result;
    }
  };
});

/**
 * @ngdoc overview
 * @name esef.frontend.pagination
 * @description
 * Pagination module for esef-frontend. Provides pagination service.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.pagination', []);

/**
 * @ngdoc service
 * @name esef.frontend.pagination.services:pagination
 * @description
 * Pagination helper service. Makes calculations for current page, offset fix, number of pages and displayed page numbers.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.pagination').factory('pagination', function() {
  return {

    /**
     * @ngdoc object
     * @name getFixedOffset
     * @methodOf esef.frontend.pagination.services:pagination
     * @description
     * Fixes data offset if it is beyond the count + active page size.
     * @param {number} offset     - Data offset.
     * @param {number} size       - Number of entries displayed on each page.
     * @param {number} count      - Total data count.
     * @return {number}           - Fixed offset.
     * @function
     */
    getFixedOffset: function(offset, size, count) {
      if (count < (offset + size)) {
        return count - size;
      } else {
        return offset;
      }
    },

    /**
     * @ngdoc object
     * @name getNumberOfPages
     * @methodOf esef.frontend.pagination.services:pagination
     * @description
     * Returns total number of pages.
     * @param {number} size       - Number of entries displayed on each page.
     * @param {number} count      - Total data count.
     * @return {number}           - Number of pages.
     * @function
     */
    getNumberOfPages: function(size, count) {
      var pages;
      pages = Math.ceil(count / size);
      if (pages === 0) {
        pages++;
      }
      return pages;
    },

    /**
     * @ngdoc object
     * @name getCurrentPage
     * @methodOf esef.frontend.pagination.services:pagination
     * @description
     * Calculates and returns current page number.
     * @param {number} offset     - Data offset.
     * @param {number} size       - Number of entries displayed on each page.
     * @param {number} totalPages - Total number of pages.
     * @return {number}           - Active page number.
     * @function
     */
    getCurrentPage: function(offset, size, totalPages) {
      var currentPage;
      currentPage = (offset / size) + 1;
      if (currentPage > totalPages) {
        return totalPages;
      } else {
        return currentPage;
      }
    },

    /**
     * @ngdoc object
     * @name getPages
     * @methodOf esef.frontend.pagination.services:pagination
     * @description
     * Calculates displayed page numbers and constructs them in an array.
     * @param {number} currentPage       - Active page number being displayed.
     * @param {number} totalPages        - Total number of pages.
     * @param {number} paginationOffset  - Number of pages to be displayed beginning from current page on left and right.
     * @return {array}                   - Page numbers array.
     * @function
     */
    getPages: function(currentPage, totalPages, paginationOffset) {
      var end, i, start, _i, _results;
      start = 1;
      end = totalPages;
      if (currentPage < paginationOffset + 1) {
        paginationOffset = paginationOffset + (paginationOffset - currentPage) + 1;
      } else if (totalPages - currentPage < paginationOffset + 1) {
        paginationOffset = paginationOffset + (paginationOffset - (totalPages - currentPage));
      }
      if (currentPage - paginationOffset > 0) {
        start = currentPage - paginationOffset;
      }
      if (currentPage + paginationOffset < totalPages) {
        end = currentPage + paginationOffset;
      }
      _results = [];
      for (i = _i = start; start <= end ? _i <= end : _i >= end; i = start <= end ? ++_i : --_i) {
        _results.push(i);
      }
      return _results;
    }
  };
});

/**
 * @ngdoc overview
 * @name esef.frontend.refresh
 * @description
 * Refresh module for esef-frontend, provides refresh service.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.refresh', []);

/**
 * @ngdoc service
 * @name esef.frontend.refresh.services:refresh
 * @description
 * Refresh service implements a recursive periodical refresh function.
 * Provides easy to use simple API to run a function periodically by given interval.
 * @author İsmail Demirbilek
 * @function
 */
angular.module('esef.frontend.refresh').factory('refresh', function($timeout) {
  var refresh, refreshInterval, timeoutPromise, working;
  timeoutPromise = null;
  refreshInterval = 10000;
  working = false;
  refresh = function(refreshCallback) {
    timeoutPromise = $timeout(function() {
      return refresh(refreshCallback);
    }, refreshInterval);
    console.debug('Auto refresh triggered.');
    return refreshCallback();
  };
  return {

    /**
     * @ngdoc object
     * @name setInterval
     * @methodOf esef.frontend.refresh.services:refresh
     * @param {number} interval - Interval in terms of milliseconds.
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Sets interval for refresh timeout which is set 10000 as default.
     * @function
     */
    setInterval: function(interval) {
      refreshInterval = interval;
      return this;
    },

    /**
     * @ngdoc object
     * @name start
     * @methodOf esef.frontend.refresh.services:refresh
     * @param {function} callback - Callback function to be run periodically.
     * @returns {object}          - refresh service to support chaining.
     * @description
     * Main method which starts refreshing. Takes callback param that will be run on every period.
     * @function
     */
    start: function(callback) {
      if (!working) {
        working = true;
        console.debug('Starting refresh.');
        refresh(callback);
      } else {
        console.debug('Refresh is already started.');
      }
      return this;
    },

    /**
     * @ngdoc object
     * @name stop
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Stops refresh function if it is started.
     * @function
     */
    stop: function() {
      if (working) {
        working = false;
        $timeout.cancel(timeoutPromise);
        console.debug('Stopped refreshing.');
      } else {
        console.debug('Can\'t stop, already stopped refreshing.');
      }
      return this;
    },

    /**
     * @ngdoc object
     * @name isStarted
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - Refresh status true if it is started.
     * @description
     * Returns true if refresh function is running; false if it is not.
     * @function
     */
    isStarted: function() {
      return working;
    },

    /**
     * @ngdoc object
     * @name isStopped
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - Refresh status true if it is stopped.
     * @description
     * Returns true if refresh function is not running; false if it is.
     * @function
     */
    isStopped: function() {
      return !working;
    }
  };
});

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
