angular.module('meanApp').controller('createController', function($scope, $http) {
    $scope.SavePeople = function() {
        $http.post('/api/AddPeople', $scope.People).then(function(response) {
            console.log('People data saved');
        });
    }
});
