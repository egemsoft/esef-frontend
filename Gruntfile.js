'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    appConfig: {
      app: 'src',
      name: 'Esef Frontend',
      dist: 'dist'
    },
    banner: '/*!\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * Author: <%= pkg.author.name %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> Egemsoft' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',
    concat: {
      js: {
        options: {
          banner: '\'use strict\';\n<%= banner %>\n',
          // remove use strict tags
          process: function(src) {
            return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
          stripBanners: true
        },
        files: {
          '<%= appConfig.dist %>/bundle/esef-frontend.js': ['<%= appConfig.app %>/{,*/}{,scripts/}{,*/}*.js'],
          '<%= appConfig.dist %>/pagination/pagination.js': ['<%= appConfig.app %>/pagination/{,scripts/}{,*/}*.js'],
          '<%= appConfig.dist %>/storage/storage.js': ['<%= appConfig.app %>/storage/{,scripts/}{,*/}*.js']
        }
      },
      css: {
        options: {
          banner: '<%= banner %>\n'
        },
        files: {
          '<%= appConfig.dist %>/bundle/esef-frontend.css': ['<%= appConfig.app %>/{,*/}styles/{,*/}*.css']
        }
      }
    },
    connect: {
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= appConfig.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/*',
            '!<%= appConfig.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= appConfig.app %>/{,*/}scripts/{,*/}*.js'
      ]
    },
    cssmin: {
      dist: {
        files: {
          '<%= appConfig.dist %>/css/esef-frontend.min.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= appConfig.app %>/{,*/}styles/{,*/}*.css'
          ]
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>/',
          src: '{,*/}*.js',
          dest: '.tmp'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= appConfig.dist %>/bundle/esef-frontend.min.js': ['.tmp/bundle/**.js'],
          '<%= appConfig.dist %>/storage/storage.min.js': ['.tmp/storage/**.js'],
          '<%= appConfig.dist %>/pagination/pagination.min.js': ['.tmp/pagination/**.js']
        }
      }
    },
    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false,
        title: '<%= appConfig.name %> Documentation'
      },
      all: ['<%= appConfig.app %>/{,*/}scripts/{,*/}*.js']
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'clean:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat:js',
    // 'concat:css',
    'ngmin',
    // 'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);

};