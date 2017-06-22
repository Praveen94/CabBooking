angular.module('meanApp').controller('loginController',function($scope, $http,AuthenticationService){
function initController(){
  AuthenticationService.Logout();
};


    $scope.LoginUser = function() {
        AuthenticationService.Login($scope.Login,function(response){
        if(response.success ===true){
          
          $location.path('/booking');
        }
else{
  $scope.message=response.message;
}


      });

    };

});
