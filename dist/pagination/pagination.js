'use strict';
/*!
 * esef-frontend - v1.0.2
 * https://github.com/egemsoft/esef-frontend
 * 2014-10-09
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
