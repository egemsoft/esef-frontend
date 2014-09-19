'use strict'

describe 'esef.frontend.pagination test service: pagination', ->

	beforeEach module 'esef.frontend'

	pagination = undefined

	beforeEach inject ($injector) ->
		pagination = $injector.get 'pagination'

	it 'should be something', ->
		expect(!!pagination).toBe true