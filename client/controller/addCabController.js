angular.module('meanApp').controller('addCabController', function($scope,$http) {

$scope.AddCab=function(){

$http.post('/AddDriver',$scope.Driver).then(function(res){
  console.log('Driver Data Saved');
});

$http.post('/AddCab',$scope.Driver).then(function(res){
  console.log('Cab Data Saved');
});



    };
//
    $http.get('/getDriver').then(function(response) {
      console.log(response.data);
        $scope.DriverData = response.data;
    });




//
    $scope.GetDriver= function(t) {
      $scope.DriverMobile=t.MobileNo;
        $http.get('/getDriver/'+t.MobileNo).then(function(response) {

            console.log(response.data);
                $scope.getDriver= response.data;
        });

        $http.get('/getCabDetail/'+t.MobileNo).then(function(response) {

                console.log(response.data);
                $scope.getCab= response.data;
        });




      };


          $scope.UpdateCabDetails=function(){
            $http.put('/UpdateCab/'+$scope.getCab[0]._id+'/'+$scope.getDriver[0].MobileNo,$scope.getCab[0]).then(function(res){
              console.log('Cab data edited');
            });
            $http.put('/UpdateDriver/'+$scope.getDriver[0]._id,$scope.getDriver[0]).then(function(res){
              console.log('Driver data edited');
            });

       };




    $scope.UpdateTariff=function(){
      $http.put('/UpdateTariff/'+$scope.DriverId,$scope.getTariff.data).then(function(res){
        console.log('Tariff data edited');
      });
 };
//
//
//
//
    $scope.DeleteCab = function(d) {

      $http.delete('/DeleteDriver/' + d.MobileNo).then(function(response) {
          console.log('Driver Deleted');
      });

        $http.delete('/DeleteCab/' + d.MobileNo).then(function(response) {
            console.log('Cab Deleted');
        });
      };

    });
