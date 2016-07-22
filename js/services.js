/**
 * Created by Rasoul on 6/4/2015.
 */

var services = angular.module('starter.services', [])

    services // Global Service
    .factory('$SQLite', function($cordovaSQLite, $q, $ionicPlatform) {
        var db = null;
        $ionicPlatform.ready(function(){
            if (window.cordova) {
                // App syntax
                db = $cordovaSQLite.openDB("myapp.db");
            } else {
                // Ionic serve syntax
                db = window.openDatabase("myapp.db", "1.0", "My app", -1);
            }
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS PRODUCT (id integer primary key, designation text, price integer)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS CLIENT (id integer primary key, name text)");
            $cordovaSQLite.execute(db, "CREATE TABLE If NOT EXISTS COMMAND (id integer primary key, id_client integer, id_product integer, quantity integer)");

        });
            return{

                query: function(query, parameters){
                    parameters = parameters || [];
                    var q =  $q.defer();

                    $ionicPlatform.ready(function(){
                        $cordovaSQLite.execute(db, query, parameters).
                            then(function(result){
                                q.resolve(result);
                            }, function(error){
                                console.warn(error);
                                q.reject(error);
                            })
                    })

                    return q.promise;
                },

                getAll : function (result) {
                    var output = [];

                    for (var i = 0; i < result.rows.length; i++) {
                        output.push(result.rows.item(i));
                    }
                    return output;
                },

                getById : function(result) {
                    var output = null;
                    output = angular.copy(result.rows.item(0));
                    return output;
                }
            }
    });

    //
    services
        .factory('$productService', function ($SQLite) {
        return {
            create: function (product) {
                var parameters = [product.designation, product.price];
                return $SQLite.query("INSERT INTO product(designation, price) values(?, ?)", parameters);
            },

            update: function (product) {
                var identity = product.id;
                var parameters = [product.designation, product.price, identity];
                return $SQLite.query("UPDATE product SET designation= (?), price = (?) WHERE id = (?)", parameters);
            },

            find: function (id) {
                var parameters = [id];
                return $SQLite.query("SELECT id, designation, price FROM product WHERE id = (?)", parameters)
                    .then(function (result) {
                        return $SQLite.getById(result);
                    });
            },

            list: function () {
                return $SQLite.query("SELECT id, designation, price FROM product")
                    .then(function (result) {
                        return $SQLite.getAll(result);
                    });
            },

            delete: function (id) {
                var parameters = [id];
                return $SQLite.query("DELETE FROM product WHERE id = (?)", parameters);
            },

            atStore: function() {
                var parameters = [1];
                return $SQLite.query("SELECT id, designation, price FROM product WHERE available =(?)", parameters)
                    .then(function(result){
                        return $SQLite.getAll(result);
                    });
            }
        }
    })


            .factory('MockProductService', function($ionicPlatform, $q){

        var products = [
            {
                id: 1,
                designation: 'I phone',
                price: 1200
            },
            {
                id: 2,
                designation: 'I pad',
                price: 800
            }
        ];

        // don't use autoincrement
        var auto_increment = products.length + 1;
        //
        return {

            list : function(){
                var q = $q.defer();

                if(products){
                    q.resolve(products);
                } else {
                    q.reject();
                }

                return q.promise;
            },

            create: function(product){
                var q = $q.defer();

                try{
                    product.id = ++auto_increment;
                    products.push(product);
                    q.resolve(product);

                }catch(exception){
                    q.reject(exception);

                }finally{
                    return q.promise;
                }

            },

            find : function(id){
                var q = $q.defer();
                var product = {};
                for(i = 0; i < products.length; i++){
                    product = products[i];
                    if(product.id == id){
                        q.resolve(product);
                    }
                }
                q.reject('Not found');

                return q.promise;
            },

            delete: function(id){
                var q =  $q.defer();

                var product = {};
                for(i = 0; i < products.length; i++){
                    product = products[i];
                    if(product.id == id){
                        products.splice(i);
                        q.resolve(product);
                    }
                }
                q.reject('Not found');

                return q.promise;

            },
            update: function(product){
                var q =  $q.defer();

                var a_product = {};
                for(i = 0; i < products.length; i++){
                    a_product = products[i];
                    if(a_product.id == product.id){
                        products[i] = product;
                        q.resolve(product);
                    }
                }
                q.reject('Not found');

                return q.promise;
            }
        }
    });

    services
        .factory('$clientService', function($SQLite){
            return{
                create: function (client) {
                    var parameters = [client.name];
                    return $SQLite.query("INSERT INTO client(name) values(?)", parameters);
                },
                list: function () {
                    return $SQLite.query("SELECT id, name FROM client")
                        .then(function (result) {
                            return $SQLite.getAll(result);
                        });
                },
                find: function(id) {
                    var parameters = [id];
                    return $SQLite.query("SELECT id, name FROM client WHERE id = (?)", parameters)
                        .then(function (result) {
                            return $SQLite.getById(result);
                        });
                },
                delete: function (id) {
                    var parameters = [id];
                    return $SQLite.query("DELETE FROM client WHERE id = (?)", parameters);
                },
                update: function(client){
                    var identity = client.id;
                    var parameters = [client.name, identity];
                    return $SQLite.query("UPDATE client SET name= (?) WHERE id = (?)", parameters);
                }
            }
        });

    services
        .factory('$commandService',function($SQLite){
            return{
                create: function (command) {
                    var parameters = [command.id_client,command.id_product,command.quantity];
                    return $SQLite.query("INSERT INTO command(id_client,id_product,quantity) values(?,?,?)", parameters);
                },
                list: function (command) {
                    return $SQLite.query("SELECT id, id_client, id_product, quantity FROM command")
                        .then(function (result) {
                            return $SQLite.getAll(result);
                        });
                },
                find: function(id) {
                    var parameters = [id];
                    return $SQLite.query("SELECT id, id_client, id_product, quantity FROM command WHERE id = (?)", parameters)
                        .then(function (result) {
                            return $SQLite.getById(result);
                        });
                },
                delete: function (id){
                  var parameters = [id];
                    return $SQLite.query("DELETE FROM command WHERE id=(?)",parameters);
                },
                update: function(command){
                    var identify = command.id;
                    var parameters = [command.id_client, command.id_product, command.quantity, identify];
                    return $SQLite.query("UPDATE command SET id_client=(?), id_product=(?), quantity=(?) WHERE id=(?)",parameters);
                }
            }
        });

    services
        .factory('$historyService', function($SQLite, $productService, $clientService, $commandService){
            return{

                productList : function(){
                    var parameters = [];
                    return $productService.atStore();
                },

                clientList : function(){
                    return $clientService.list(); //FIXME
                },

                commandList : function(){
                    return $commandService.list();
                }
                //TODO
            }
        });
