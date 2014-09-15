'use strict';
/*!
 * esef-frontend - v1.0.0
 * https://github.com/egemsoft/esef-frontend
 * 2014-09-05
 * Copyright (c) 2014 Egemsoft
 * License: MIT
 */

/**
 * @ngdoc overview
 * @name esef.frontend.refresh
 * @description
 * Refresh module for esef-frontend, provides refresh service.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.refresh', []);
angular.module('esef.frontend.refresh')
  /**
   * @ngdoc service
   * @name esef.frontend.refresh.services:refresh
   * @description
   * Refresh service implements a recursive periodical refresh function.
   * Provides easy to use simple API to run a function periodically by given interval.
   * @author İsmail Demirbilek
   * @function
   */
  .factory('refresh', function($timeout) {
    // set configurations
    var timeoutPromise = null;
    var refreshInterval = 10000;
    var working = false;

    // create refresher
    function refresh(refreshCallback) {
      console.debug('Auto refresh triggered.');
      refreshCallback();
      // make self call periodically with refresh interval
      timeoutPromise = $timeout(function() {
        refresh(refreshCallback);
      }, refreshInterval);
    }

    // public API
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
        if(!working) {
          working = true;
          console.debug('Starting refresh.');
          refresh(callback);
        }
        else {
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
        if(working) {
          working = false;
          $timeout.cancel(timeoutPromise);
          console.debug('Stopped refreshing.');
        }
        else {
          console.debug('Can\'t stop, already stopped refreshing.');
        }
        return this;
      },
      /**
       * @ngdoc object
       * @name isStarted
       * @methodOf esef.frontend.refresh.services:refresh
       * @returns {object}        - refresh service to support chaining.
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
       * @returns {object}        - refresh service to support chaining.
       * @description
       * Returns true if refresh function is not running; false if it is.
       * @function
       */
      isStopped: function() {
        return !working;
      }
    };
  });