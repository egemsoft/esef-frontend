Esef Frontend
-------------

Reuseable Angular JS components. Consists of multiple submodules.

![egemsoft-logo](http://egemsoft.net/images/logo.png)

#Modules

 - esef.frontend - Main module that holds everything together.
 - esef.frontend.storage - Key/Value storage service implementing observer pattern. [See docs](https://rawgit.com/egemsoft/esef-frontend/master/docs/index.html#/api/esef.frontend.storage.services:storage).
 - esef.frontend.pagination - Pagination service serving helper methods to structure a pagination. [See docs](https://rawgit.com/egemsoft/esef-frontend/master/docs/index.html#/api/esef.frontend.pagination.services:pagination).
 - esef.frontend.refresh - Refresh service implementing a recursive method to run a function periodically. [See docs](https://rawgit.com/egemsoft/esef-frontend/master/docs/index.html#/api/esef.frontend.refresh.services:refresh). :new:
 - esef.frontend.filters - Handy Angular filters. [See docs](https://rawgit.com/egemsoft/esef-frontend/master/docs/index.html#/api/esef.frontend.filters). :new:

#Directory Structure

```
├── bundle
│   ├── esef-frontend.js
│   └── esef-frontend.min.js
├── filters
│   ├── filters.js
│   └── filters.min.js
├── pagination
│   ├── pagination.js
│   └── pagination.min.js
├── refresh
│   ├── refresh.js
│   └── refresh.min.js
└── storage
    ├── storage.js
    └── storage.min.js
```

#Install & Use

It's best to use bower to install.

```bash
 $ bower install esef-frontend
```

###Use Bundle

All modules will be available by using bundle package located on: `bower_components/esef-frontend/dist/bundle/esef-frontend.js`.

```js
  angular.module('myApp', ['esef.frontend']);
```

###Use Modules

All modules can also be used seperately. These modules are located under `/dist`.

To use filters module:  
```js
  angular.module('myApp', ['esef.frontend.filters']);
```

#Documentation

Documentations are available with [GitRaw](https://rawgit.com/egemsoft/esef-frontend/master/docs/index.html).

#Development
##Install

```bash
 $ npm install
 $ bower install
```

##Build

```bash
 $ grunt build
```

#License
Licensed under MIT.

#Author
İsmail Demirbilek - [@dbtek](https://twitter.com/dbtek)