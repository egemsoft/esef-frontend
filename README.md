Esef Frontend
-------------

Reuseable Angular JS components. Consists of multiple submodules.

![egemsoft-logo](http://egemsoft.net/images/logo.png)

#Modules

 - esef.frontend - Main module that holds everything together.
 - esef.frontend.storage - Key/Value storage service implementing observer pattern.
 - esef.frontend.pagination - Pagination service serving helper methods to structure a pagination.

#Directory Structure

```
dist
├── bundle
│   ├── esef-frontend.js
│   └── esef-frontend.min.js
├── pagination
│   ├── pagination.js
│   └── pagination.min.js
└── storage
    ├── storage.js
    └── storage.min.js
```

#Install & Use

It's best to use bower to install.

```bash
 $ bower install esef-frontend
``

###Use Bundle

All modules will be available by using bundle package located on: `bower_components/esef-frontend/dist/bundle/esef-frontend.js`.

```js
  angular.module('myApp', ['esef.frontend']);
```

###Use Modules

All modules can also be used seperately. These modules are located under `/dist`.

###Docs

Documentations are available with [GitRaw]().

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