'use strict'

describe 'esef.frontend.filters test service: filters', () ->

  beforeEach module 'esef.frontend'

  filter = undefined
  beforeEach inject(($injector) -> filter = $injector.get '$filter')

  it 'should be something', ->
    expect(!!filter 'titlecase').toBe true

  it 'should change case to title format properly', ->
    expect(filter('titlecase') 'tEst CaSe').toBe 'Test case'