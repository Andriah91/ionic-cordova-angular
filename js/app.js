// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.products', {
      url: "/products",
      views: {
        'menuContent': {
          templateUrl: "templates/products/listing.html",
          controller: 'ProductListController'
        }
      }
    })
      .state('app.product-create', {
          url: "/products/create",
          views: {
              'menuContent': {
                  templateUrl: "templates/products/form.html",
                  controller: 'ProductCreateController'
              }
          }
      })
      .state('app.product-details', {
          url: "/products/:id",
          views: {
              'menuContent': {
                  templateUrl: "templates/products/details.html",
                  controller: 'ProductDetailsController'
              }
          }
      })
      .state('app.product-update', {
          url: "/products/:id/update",
          views: {
              'menuContent': {
                  templateUrl: "templates/products/form.html",
                  controller: 'ProductUpdateController'
              }
          }
      })
      //CLIENTS
      .state('app.clients', {
          url: "/clients",
          views: {
              'menuContent': {
                  templateUrl: "templates/clients/listing.html",
                  controller: 'ClientListController'
              }
          }
      })
      .state('app.client-create', {
          url: "/clients/create",
          views: {
              'menuContent': {
                  templateUrl: "templates/clients/form.html",
                  controller: 'ClientCreateController'
              }
          }
      })
      .state('app.client-details', {
          url: "/clients/:id",
          views: {
              'menuContent': {
                  templateUrl: "templates/clients/details.html",
                  controller: 'ClientDetailsController'
              }
          }
      })
      .state('app.client-update', {
          url: "/clients/:id/update",
          views: {
              'menuContent': {
                  templateUrl: "templates/clients/form.html",
                  controller: 'ClientUpdateController'
              }
          }
      })

      //COMMANDS
      .state('app.commands', {
          url: "/commands",
          views: {
              'menuContent': {
                  templateUrl: "templates/commands/listing.html",
                  controller: 'CommandListController'
              }
          }
      })
      .state('app.command-create', {
          url: "/commands/create",
          views: {
              'menuContent': {
                  templateUrl: "templates/commands/form.html",
                  controller: 'CommandCreateController'
              }
          }
      })
      .state('app.command-details', {
          url: "/commands/:id",
          views: {
              'menuContent': {
                  templateUrl: "templates/commands/details.html",
                  controller: 'CommandDetailsController'
              }
          }
      })
      .state('app.command-update', {
          url: "/commands/:id/update",
          views: {
              'menuContent': {
                  templateUrl: "templates/commands/form.html",
                  controller: 'CommandUpdateController'
              }
          }
      })

      //HISTORIES
      .state('app.histories', {
          url: "/histories",
          views: {
              'menuContent': {
                  templateUrl: "templates/histories/listing.html",
                  controller: 'HistoryListController'
              }
          }
      })
      .state('app.history-create', {
          url: "/history/create",
          views: {
              'menuContent': {
                  templateUrl: "templates/histories/form.html",
                  controller: 'HistoryCreateController'
              }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/products');
});
