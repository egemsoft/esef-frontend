'use strict'

###*
 * @ngdoc service
 * @name esef.frontend.refresh.services:refresh
 * @description
 * Refresh service implements a recursive periodical refresh function.
 * Provides easy to use simple API to run a function periodically by given interval.
 * @author İsmail Demirbilek
 * @function
###
angular.module 'esef.frontend.refresh'
  .factory 'refresh', ($timeout) ->
    # set configurations
    timeoutPromise = null
    refreshInterval = 10000
    working = false

    # create refresher
    refresh = (refreshCallback) ->
      # make self call periodically with refresh interval
      # timeout promise should be updated on top to cancel it inside callback!
      timeoutPromise = $timeout(-> refresh refreshCallback, refreshInterval)
      console.debug 'Auto refresh triggered.'
      refreshCallback()

    # public API
    ###*
     * @ngdoc object
     * @name setInterval
     * @methodOf esef.frontend.refresh.services:refresh
     * @param {number} interval - Interval in terms of milliseconds.
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Sets interval for refresh timeout which is set 10000 as default.
     * @function
    ###
    setInterval: (interval) ->
      refreshInterval = interval
      this

    ###*
     * @ngdoc object
     * @name start
     * @methodOf esef.frontend.refresh.services:refresh
     * @param {function} callback - Callback function to be run periodically.
     * @returns {object}          - refresh service to support chaining.
     * @description
     * Main method which starts refreshing. Takes callback param that will be run on every period.
     * @function
    ###
    start: (callback) ->
      if !working
        working = true
        console.debug 'Starting refresh.'
        refresh callback
      else
        console.debug('Refresh is already started.');
      this

    ###*
     * @ngdoc object
     * @name stop
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Stops refresh function if it is started.
     * @function
    ###
    stop: ->
      if working
        working = false
        $timeout.cancel timeoutPromise
        console.debug 'Stopped refreshing.'
      else
        console.debug 'Can\'t stop, already stopped refreshing.'        
      this

    ###*
     * @ngdoc object
     * @name isStarted
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Returns true if refresh function is running; false if it is not.
     * @function
    ###
    isStarted: -> working

    ###*
     * @ngdoc object
     * @name isStopped
     * @methodOf esef.frontend.refresh.services:refresh
     * @returns {object}        - refresh service to support chaining.
     * @description
     * Returns true if refresh function is not running; false if it is.
     * @function
    ###
    isStopped: -> !working