'use strict'

#!
# esef-frontend
# https://github.com/egemsoft/esef-frontend
# Copyright (c) 2014 Egemsoft
# License: MIT
# Author: İsmail Demirbilek
#

module.exports = (grunt) ->

  loadGruntTasks = require 'load-grunt-tasks'
  timeGrunt = require 'time-grunt'

  loadGruntTasks grunt
  timeGrunt grunt

  grunt.initConfig
    pkg: grunt.file.readJSON 'bower.json'
    
    appConfig:
      app: 'src'
      name: 'Esef Frontend'
      dist: 'dist'
    
    banner: '/*!\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> Egemsoft\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n'

    coffee:
      test:
        files: [
          expand: true
          src: ['test/coffee/**/*.coffee']
          ext: '.js'
        ]
    
    concat:
      js:
        options:
          banner: '\'use strict\';\n<%= banner %>\n'
          # remove use strict tags
          process: (src) ->
            src.replace /(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'
        files:
          '<%= appConfig.dist %>/bundle/esef-frontend.js': ['<%= appConfig.app %>/{,*/}/{,scripts/}{,*/}*.js']
      css:
        options:
          banner: '<%= banner %>\n'
        files:
          '<%= appConfig.dist %>/bundle/esef-frontend.css': ['<%= appConfig.app %>/{,*/}styles/{,*/}*.css']
    
    connect:
      test:
        options:
          port: 9001
          base: [
            '.tmp'
            'test'
            '<%= appConfig.app %>'
          ]
    
    clean:
      dist:
        files: [
          dot: true
          src: [
            '.tmp'
            '<%= appConfig.dist %>/*'
            '!<%= appConfig.dist %>/.git*'
          ]
        ]
      server: '.tmp'
    
    jshint:
      options:
        jshintrc: '.jshintrc'
      all: [
        'Gruntfile.js'
        '<%= appConfig.app %>/{,*/}scripts/{,*/}*.js'
      ]
    
    cssmin:
      dist:
        files:
          '<%= appConfig.dist %>/css/esef-frontend.min.css': [
            '.tmp/styles/{,*/}*.css'
            '<%= appConfig.app %>/{,*/}styles/{,*/}*.css'
          ]
    
    karma:
      unit:
        configFile: 'karma.conf.js'
        singleRun: true
    
    ngAnnotate:
      dist:
        files: [
          expand: true,
          cwd: '<%= appConfig.dist %>/'
          src: '{,*/}*.js'
          dest: '.tmp'
        ]
    
    uglify:
      dist:
        files:
          '<%= appConfig.dist %>/bundle/esef-frontend.min.js': ['.tmp/bundle/**.js']
    
    ngdocs:
      options:
        dest: 'docs'
        html5Mode: false
        title: '<%= appConfig.name %> Documentation'
      all: ['<%= appConfig.app %>/{,*/}{,scripts/}{,*/}*.js']
    
    'folder_list':
      options:
        files: false
        folders: true
      files:
        src: ['*']
        cwd: 'src/'
        dest: 'modules.json'

  # set concat and uglify files configs dynamically
  grunt.registerTask 'setConfigsForSubmodules', () ->
    # generate modules.json with directories inside src
    
    # read generated modules list
    modules     = grunt.file.readJSON 'modules.json'
    concatFiles = grunt.config.get 'concat.js.files'
    uglifyFiles = grunt.config.get 'uglify.dist.files'

    for module in modules
      do (module) ->
        concatFiles["<%= appConfig.dist %>/#{ module.location }/#{ module.location }.js"]     =  ["<%= appConfig.app %>/#{ module.location }/{,scripts/}{,*/}*.js"]
        uglifyFiles["<%= appConfig.dist %>/#{ module.location }/#{ module.location }.min.js"] = [".tmp/#{ module.location }/**.js"]

        grunt.config.set 'concat.js.files', concatFiles
        grunt.config.set 'uglify.dist.files', uglifyFiles

  # Scan directories and explore submodules
  grunt.registerTask 'prepareBuild', [
    'folder_list'
    'setConfigsForSubmodules'
  ]

  grunt.registerTask 'test', [
    'jshint',
    'clean:server',
    'connect:test',
    'karma'
  ]

  grunt.registerTask 'build', [
    'prepareBuild'
    'clean:dist'
    'concat:js'
    # 'concat:css'
    'ngAnnotate'
    # 'cssmin'
    'uglify'
    'ngdocs'
  ]

  grunt.registerTask 'default', [
    'test'
    'build'
  ]