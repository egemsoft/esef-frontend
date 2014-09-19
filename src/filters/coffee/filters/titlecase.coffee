'use strict'

###*
 * @ngdoc filter
 * @name esef.frontend.filters.filters:titlecase
 * @description
 * Title case filter. Change text case to title format, first character will be uppercase and the rest will be lowercase.
 * @param {string} text - Input string.
 * @return {string}     - Title cased result string.
 * @function
 * @author İsmail Demirbilek
####
angular.module 'esef.frontend.filters'
  .filter 'titlecase', ->
    (text) ->
      text = '' if text is null or text is undefined
      lowercased = text.toString().toLocaleLowerCase()
      lowercased[0].toLocaleUpperCase().concat lowercased.substr 1,lowercased.length-1