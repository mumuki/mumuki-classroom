
angular
  .module('classroom')
  .constant('CONFIG', {

    classroom: {
      api_url: 'http://localhost:3000/classroom/api',
      //api_url: 'http://localhost:3002',
      url: 'http://localhost:3001'
    },

    laboratory: {
      url: 'http://localhost:3000'
    },

    bibliotheca: {
      //api_url: 'http://localhost:3004'
      api_url: 'http://localhost:3000/bibliotheca/api'
    },

    cookie: {
      domain: 'localhost',
    },

    organizationMappingMode: 'path'

  });
