'use strict'

describe 'esef.frontend.pagination test service: refresh', ->

  beforeEach module 'esef.frontend'

  refresh = undefined

  beforeEach inject ($injector) ->
    refresh = $injector.get 'refresh'

  it 'should be something', ->
    expect(!!refresh).toBe true