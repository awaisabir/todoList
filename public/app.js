// angular app
var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
  $scope.list = {};

  $http.get('/api/todos')
    .success(function(todos) {
      $scope.todos = todos;
      console.log(todos);
    })
    .error(function(data) {

    });

    //creating a todo
    $scope.createAToDo = function() {
      $http.post('/api/todos', $scope.list)
        .success(function(todos) {
          $scope.list = {};
          $scope.todos = todos;
          console.log(todos);
        })
        .error(function(data) {

        });
    };

    $scope.deleteAToDo = function(id) {
      $http.delete('/api/todos/' + id)
        .success(function(todos) {
          $scope.todos = todos;

        })
        .error(function(data) {

        });
    };

}]);
