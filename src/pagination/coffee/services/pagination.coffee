'use strict'
###*
 * @ngdoc service
 * @name esef.frontend.pagination.services:pagination
 * @description
 * Pagination helper service. Makes calculations for current page, offset fix, number of pages and displayed page numbers.
 * @function
 * @author İsmail Demirbilek
###
angular.module 'esef.frontend.pagination'
  .factory 'pagination', ->
    # public api
      ###*
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
      ###
      getFixedOffset: (offset, size, count) ->
        if (count < (offset + size))
          count - size
        else
          offset

      ###*
       * @ngdoc object
       * @name getNumberOfPages
       * @methodOf esef.frontend.pagination.services:pagination
       * @description
       * Returns total number of pages.
       * @param {number} size       - Number of entries displayed on each page.
       * @param {number} count      - Total data count.
       * @return {number}           - Number of pages.
       * @function
      ###
      getNumberOfPages: (size, count) ->
        pages = Math.ceil count / size
        if pages is 0
          pages+1
        pages

      ###*
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
      ###
      getCurrentPage: (offset, size, totalPages) ->
        currentPage = (offset / size) + 1
        if currentPage > totalPages
          totalPages
        currentPage

      ###*
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
      ###
      getPages: (currentPage, totalPages, paginationOffset) ->
        start = 1
        end = totalPages
        if currentPage < paginationOffset + 1
          paginationOffset = paginationOffset + (paginationOffset - currentPage)
        else if totalPages - currentPage < paginationOffset + 1
          paginationOffset = paginationOffset + (paginationOffset - (totalPages - currentPage)) + 1
        
        if currentPage - paginationOffset > 0
          start  = currentPage - paginationOffset
        if currentPage +  paginationOffset < totalPages
          end = currentPage + paginationOffset

        (i for i in [start .. end])