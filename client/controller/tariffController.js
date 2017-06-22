angular.module('meanApp').controller('tariffController', function($scope,$http) {


    $scope.AddTariff=function(){

$http.post('/AddTariff',$scope.Tariff).then(function(res){
  console.log('Tariff Data Saved');
});
    };

    $http.get('/GetTariff').then(function(response) {
        $scope.TariffData = response.data;
    });

    $scope.GetTariff = function(t) {
      $scope.TariffId=t._id;
        $http.get('/GetTariff/' +t._id).then(function(response) {
                $scope.getTariff = response;
        });
      };






    $scope.UpdateTariff=function(){
      $http.put('/UpdateTariff/'+$scope.TariffId,$scope.getTariff.data).then(function(res){
        console.log('Tariff data edited');
      });
 };




    $scope.DeleteTariff = function(tariff) {
        $http.delete('/DeleteTariff/' + tariff._id).then(function(response) {
            console.log('Deleted');
        });
      };

    });
