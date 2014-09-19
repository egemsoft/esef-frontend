'use strict'

describe 'esef.frontend.pagination test service: storage', ->

  beforeEach module 'esef.frontend'

  storage = undefined

  beforeEach inject ($injector) ->
    storage = $injector.get 'storage'

  it 'should be something', ->
    expect(!!storage).toBe true