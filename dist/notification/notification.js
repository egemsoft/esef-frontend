'use strict';
/*!
 * esef-frontend - v1.0.2
 * https://github.com/egemsoft/esef-frontend
 * 2014-09-30
 * Copyright (c) 2014 Egemsoft
 * License: MIT
 */

/**
 * @ngdoc overview
 * @name esef.frontend.notification
 * @description
 * Dialog and notification services.
 * @function
 */
angular.module('esef.frontend.notification', ['ui.bootstrap.modal'])
.run(['$templateCache', function($templateCache) {
  $templateCache.put('notification/views/confirm-dialog.html',
  '<div class="modal-body">' +
		'<h4 class="modal-title">' +
			'<i class="fa fa-comment"></i> {{ title }}' +
		'</h4>' +
		'<hr/>' +
		'<p translate>{{ message }}</p>' +
		'<div class="text-right">' +
			'<button type="button" class="btn btn-default" ng-click="$close(false)">Cancel</button>' +
			'<button type="button" class="btn btn-danger" ng-click="$close(true)">Yes</button>'+
		'</div>' +
	'</div>');
}]);
/**
 * @ngdoc service
 * @name esef.frontend.notification.services:esefNotify
 * @description
 * Dialog and notification services.
 * @function
 */
angular.module('esef.frontend.notification')
	.factory('esefNotify', function ($modal) {
		return {
			/**
			 * @ngdoc object
			 * @name confirm
			 * @methodOf esef.frontend.notification.services:esefNotify
			 * @param {string} title	 - Confirm dialog title.
			 * @param {string} message - Confirm dialog body message.
			 * @return {object}        - Modal instance result (promise) to be resolved with confirm status (true | false).
			 * @description
			 * Creates a confirm dialog with ui-bootstrap's modal, opens it and returns its' instance result.
			 * @function
			 */
			confirm: function (title, message) {
				return $modal.open({
					templateUrl: 'notification/views/confirm-dialog.html',
					size: 'sm',
					controller: function ($scope, title, message) {
						$scope.title = title;
						$scope.message = message;
					},
					resolve: {
						title: function () {
							return title;
						},
						message: function () {
							return message;
						}
					}
				}).result;
			}
		};
	});