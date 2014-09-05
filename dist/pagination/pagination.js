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
 * @name esef.frontend.pagination
 * @description
 * Pagination module for esef-frontend. Provides pagination service.
 * @function
 * @author İsmail Demirbilek
 */
angular.module('esef.frontend.pagination', []);
angular.module('esef.frontend.pagination')
  /**
   * @ngdoc service
   * @name esef.frontend.pagination.services:pagination
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
       * @methodOf esef.frontend.pagination.services:pagination
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
       * @methodOf esef.frontend.pagination.services:pagination
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
       * @name getCurrentPage
       * @methodOf esef.frontend.pagination.services:pagination
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