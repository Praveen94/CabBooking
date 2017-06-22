angular.module('meanApp').controller('driverController',function($scope, $http,$window) {
  this.$window=$window;
var socket=io();




  $scope.initMap2=function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }

    window.currentLocation="";

    function showPosition(position) {


        var origin2=position.coords.latitude + "," + position.coords.longitude;
console.log(origin2);
    window.myLat2=position.coords.latitude;
  window.myLng2=position.coords.longitude;




    //  var myLatLng = {lat:myLat, lng:myLng};
    var map2Options = {
        center:{lat:myLat2, lng:myLng2},
        zoom: 7,
       mapTypeId: google.maps.MapTypeId.ROADMAP

    };

     window.map2 = new google.maps.Map(document.getElementById('map2'), map2Options);
     //



     console.log(myLat2);
     console.log(myLng2);

     var driverPosLat=myLat2;
     var driverPosLng=myLng2;

     var marker3Options = {
                position:{lat:myLat2, lng:myLng2},
                map: map2,
                draggable: true,
                animation: google.maps.Animation.DROP
            }
            var marker3 = new google.maps.Marker(marker3Options);

marker3.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');

socket.emit('getLocation',{
  'msg':{
            lat:driverPosLat,
            lng:driverPosLng
          }
});

}
  };
});
