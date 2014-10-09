'use strict'

###*
 * @ngdoc overview
 * @name esef.frontend.notification
 * @description
 * Dialog and notification services.
 * @function
###
angular.module 'esef.frontend.notification', ['ui.bootstrap.modal']
.run(['$templateCache', ($templateCache) ->
  $templateCache.put 'notification/views/confirm-dialog.html',
  '<div class="modal-body">
    <h4 class="modal-title">
      <i class="fa fa-comment"></i> {{ title }}
    </h4>
    <hr/>
    <p translate>{{ message }}</p>
    <div class="text-right">
      <button type="button" class="btn btn-default" ng-click="$close(false)">Cancel</button>
      <button type="button" class="btn btn-danger" ng-click="$close(true)">Yes</button>
    </div>
  </div>'
])