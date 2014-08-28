'use strict';
/*!
 * esef-frontend - v1.0.0
 * https://github.com/egemsoft/esef-frontend
 * 2014-08-28
 * Author: İsmail Demirbilek
 * Copyright (c) 2014 Egemsoft * License: MIT
 */
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