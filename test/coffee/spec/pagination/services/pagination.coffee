'use strict'

describe 'esef.frontend.pagination test service: pagination', ->

	beforeEach module 'esef.frontend'

	pagination = undefined

	beforeEach inject ($injector) ->
		pagination = $injector.get 'pagination'

	it 'should be something', ->
		expect(!!pagination).toBe true

	it 'should have a valid getFixedOffset method', ->
		expect(!!pagination.getFixedOffset).toBe true
		expect(pagination.getFixedOffset 20, 20, 35 ).toBe 15

	it 'should have a valid getNumberOfPages method', ->
		expect(!!pagination.getNumberOfPages).toBe  true
		expect(pagination.getNumberOfPages 50, 210).toBe 5

	it 'should have a valid getCurrentPage method', ->
		expect(!!pagination.getCurrentPage).toEqual true
		expect(pagination.getCurrentPage 50, 50, 4).toEqual 2

	it 'should have a valid getPages method', ->
		expect(!!pagination.getPages).toEqual true
		expect(pagination.getPages 14, 50, 5).toEqual [9,10,11,12,13,14,15,16,17,18,19]
		# should return 2*offset pages except the active one in offset edges too
		expect(pagination.getPages 3, 15, 5).toEqual [1,2,3,4,5,6,7,8,9,10,11]
		expect(pagination.getPages 18, 20, 5).toEqual [10,11,12,13,14,15,16,17,18,19,20]