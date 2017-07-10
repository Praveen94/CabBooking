angular.module('meanApp').controller('tariffController', function($scope,$http,$mdDialog) {



var initTariff=function(){

console.log('Init executed');
  $http.get('/GetTariff').then(function(response) {

      $scope.TariffData = response.data;
  });
};

    $scope.AddTariff=function(){

$http.post('/AddTariff',$scope.Tariff).then(function(res){
  console.log('Tariff Data Saved');


});
$scope.Tariff="";
initTariff();
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
initTariff();
 };




    $scope.DeleteTariff = function(tariff,event) {

      // $scope.showConfirm = function(event) {
                     var confirm = $mdDialog.confirm()
                         .title('Are you sure to delete the record?')
                       .textContent('Record will be deleted permanently.')
                         .targetEvent(event)
                         .ok('Yes')
                         .cancel('No');
                         $mdDialog.show(confirm).then(function() {
      //                   //   $scope.status = 'Record deleted successfully!';
      $http.delete('/DeleteTariff/' + tariff._id).then(function(response) {
                                    console.log('Deleted');
  initTariff();
                                });

                                              }, function() {
                             console.log('You decided to keep your record.');
                        });

     };

      $('#StartPeakHour').bootstrapMaterialDatePicker({
        format : 'HH:mm',
        date:false,
       time:true,
        });

        $('#StopPeakHour').bootstrapMaterialDatePicker({
          format : 'HH:mm',
          date:false,
         time:true,
          });





    });

    // $scope.showConfirm = function(event) {
    //                var confirm = $mdDialog.confirm()
    //                   .title('Are you sure to delete the record?')
    //                   .textContent('Record will be deleted permanently.')
    //                   .ariaLabel('TutorialsPoint.com')
    //                   .targetEvent(event)
    //                   .ok('Yes')
    //                   .cancel('No');
    //                   $mdDialog.show(confirm).then(function() {
    //                   //   $scope.status = 'Record deleted successfully!';
    //                   //    }, function() {
    //                   //       $scope.status = 'You decided to keep your record.';
    //                   // }
    //                 });
    //             };
