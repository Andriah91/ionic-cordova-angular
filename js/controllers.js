var controllers = angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

controllers
.controller('ProductListController', function ($scope, $state, $productService) {
        $scope.$on('$ionicView.enter' ,function() {
            $productService.list().then(
                function(result){
                    $scope.products = result;
                },
                function(error){
                    $scope.error = error;
                }
            )
        });

        $scope.add = function(){
            $state.go('app.product-create');
        }

    })

.controller('ProductCreateController', function($scope, $state, $productService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.product = {};
        });

        //
        $scope.save = function(){
            $productService.create($scope.product).then(
                function(result){
                    console.log(result);
                    $state.go('app.products');
                },
                function(error){
                    console.log(error);
                });
        }
    })


.controller('ProductDetailsController', function($scope, $state, $stateParams,  $ionicPopup, $productService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $productService.find($scope.id).then(
                function(product){
                    $scope.product = product;
                },
                function(error){
                    console.log(error);
                });


        });
            
            
        $scope.edit = function () {
            $state.go('app.product-update', {id: $scope.id});
        };

        $scope.delete = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete?',
                template: 'Everything about this product will be erased'
            });
            confirmPopup.then(function(confirmation) {
                if(confirmation) {
                    $productService.delete($scope.id).then(
                        function(result){
                            $state.go('app.products');
                        },
                        function(error){
                            console.log(error);
                        }
                    )
                }
            });
        };
    })


.controller('ProductUpdateController', function($scope, $state, $stateParams, $productService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $productService.find($scope.id).then(
                function(product){
                    $scope.product = product;
                },
                function(error){
                    console.log(error);
                });
        });

        $scope.save = function(){
            $productService.update($scope.product).then(
                function(result){
                    $state.go('app.product-details', {id: $scope.id});
                },
                function(error){
                    console.log(error);
                })
        }

});


controllers
.controller('ClientListController', function($scope, $state, $clientService){
        $scope.$on('$ionicView.enter', function(){
            $clientService.list().then(
                function(result){
                    $scope.clients = result;
                },
                function(error){
                    $scope.error = error;
                }
            )
        });

        $scope.add = function(){
            $state.go('app.client-create');
        }
    })
.controller('ClientCreateController', function($scope, $state, $clientService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.client = {};
        });

        //
        $scope.save = function(){
            $clientService.create($scope.client).then(
                function(result){
                    console.log(result);
                    $state.go('app.clients');
                },
                function(error){
                    console.log(error);
                });
        }
    })
.controller('ClientDetailsController', function($scope, $state, $stateParams,  $ionicPopup, $clientService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $clientService.find($scope.id).then(
                function(client){
                    $scope.client = client;
                },
                function(error){
                    console.log(error);
                });


        });

        $scope.edit = function () {
            $state.go('app.client-update', {id: $scope.id});
        };

        $scope.delete = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete?',
                template: 'Everything about this Client will be erased'
            });
            confirmPopup.then(function(confirmation) {
                if(confirmation) {
                    $clientService.delete($scope.id).then(
                        function(result){
                            $state.go('app.clients');
                        },
                        function(error){
                            console.log(error);
                        }
                    )
                }
            });
        };

    })
    .controller('ClientUpdateController', function($scope, $state, $stateParams, $clientService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $clientService.find($scope.id).then(
                function(client){
                    $scope.client = client;
                },
                function(error){
                    console.log(error);
                });
        });

        $scope.save = function(){
            $clientService.update($scope.client).then(
                function(result){
                    $state.go('app.client-details', {id: $scope.id});
                },
                function(error){
                    console.log(error);
                })
        }

    });

//Command
controllers
    .controller('CommandListController', function ($scope, $state, $commandService) {
        $scope.$on('$ionicView.enter' ,function() {
            $commandService.list().then(
                function(result){
                    $scope.commands = result;
                },
                function(error){
                    $scope.error = error;
                }
            )
        });

        $scope.add = function(){
            $state.go('app.command-create');
        }

    })

    .controller('CommandCreateController', function($scope, $state, $commandService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.command = {};
        });

        //
        $scope.save = function(){
            $commandService.create($scope.command).then(
                function(result){
                    console.log(result);
                    $state.go('app.commands');
                },
                function(error){
                    console.log(error);
                });
        }
    })


    .controller('CommandDetailsController', function($scope, $state, $stateParams,  $ionicPopup, $commandService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $commandService.find($scope.id).then(
                function(command){
                    $scope.command = command;
                },
                function(error){
                    console.log(error);
                });

        });


        $scope.edit = function () {
            $state.go('app.command-update', {id: $scope.id});
        };

        $scope.delete = function(){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete?',
                template: 'Everything about this command will be erased'
            });
            confirmPopup.then(function(confirmation) {
                if(confirmation) {
                    $commandService.delete($scope.id).then(
                        function(result){
                            $state.go('app.commands');
                        },
                        function(error){
                            console.log(error);
                        }
                    )
                }
            });
        };
    })


    .controller('CommandUpdateController', function($scope, $state, $stateParams, $commandService){
        $scope.$on('$ionicView.enter' ,function() {
            $scope.id = $stateParams.id;

            $commandService.find($scope.id).then(
                function(command){
                    $scope.command = command;
                },
                function(error){
                    console.log(error);
                });
        });

        $scope.save = function(){
            $commandService.update($scope.command).then(
                function(result){
                    $state.go('app.command-details', {id: $scope.id});
                },
                function(error){
                    console.log(error);
                })
        }

    });

controllers
.controller('HistoryListController', function($scope, $state, $historyService){
        $scope.$on('$ionicView.enter' ,function() {
            //FIXME
        });

        $scope.add = function(){
            $state.go('app.history-create');
        }

    })
    .controller('HistoryCreateController', function($scope, $state, $historyService){
        $scope.products = [];
        $scope.productOff = [];
        $scope.clients = [];
        $scope.commands = [];

        $scope.$on('$ionicView.enter', function(){
            $historyService.clientList().then(
                function (clients) {
                    $scope.clients = clients;
                },
                function(error){

                }
            );

            $historyService.productList().then(
                function(products){ //products.length == 0?
                    $scope.productsOff = products;
                    console.log($scope.productsOff);
                },
                function(error){
                    //Todo
                    console.log(0);
                }
            );

            $historyService.commandList().then(
                function(commands) {
                    $scope.commands = commands;
                    console.log($scope.commands);
                },
                function(error){

                }
            );
        });

        $scope.move = function(product){
            $scope.exchange($scope.productsOff, $scope.products, product);
        };

        $scope.remove = function(product){
            $scope.exchange($scope.products, $scope.productsOff, product);
        };

        //exchange
        $scope.exchange = function(from, to, element){
            from.splice(from.indexOf(element),/*important*/ 1);
            to.push(element);
            console.log(to);
        }
    });