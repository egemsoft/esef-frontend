'use strict';

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
angular.module('esef.frontend', [
    'esef.frontend.storage',
    'esef.frontend.pagination',
    'esef.frontend.refresh'
  ]);