'use strict'

###*
 * @ngdoc service
 * @name esef.frontend.notification.services:esefNotify
 * @description
 * Dialog and notification services.
 * @function
###

angular.module 'esef.frontend.notification'
  .factory 'esefNotify', ($modal) ->
      ###*
       * @ngdoc object
       * @name confirm
       * @methodOf esef.frontend.notification.services:esefNotify
       * @param {string} title   - Confirm dialog title.
       * @param {string} message - Confirm dialog body message.
       * @return {object}        - Modal instance result (promise) to be resolved with confirm status (true | false).
       * @description
       * Creates a confirm dialog with ui-bootstrap's modal, opens it and returns its' instance result.
       * @function
      ###
      confirm: (title, message) ->
        $modal.open
          templateUrl: 'notification/views/confirm-dialog.html',
          size: 'sm',
          controller: ($scope, title, message) ->
            $scope.title = title
            $scope.message = message
            null
          resolve:
            title: ->
              title
            message: ->
              message
        .result