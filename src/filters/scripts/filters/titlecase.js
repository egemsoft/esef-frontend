'use strict';

angular.module('esef.frontend.filters')
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
  .filter('titlecase', function() {
    return function(text) {
      text = ( text === undefined || text === null ) ? '' : text;
      var lowercased = text.toString().toLocaleLowerCase();
      return lowercased[0].toLocaleUpperCase().concat(lowercased.substr(1,lowercased.length-1));
    };
  });