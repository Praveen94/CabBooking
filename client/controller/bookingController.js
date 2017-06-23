angular.module('meanApp').controller('bookingController', function($scope, $http,$window) {
  this.$window=$window;
var socket=io();


  $scope.initMap=function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    }

    window.currentLocation="";

    function showPosition(position) {



        window.origin=position.coords.latitude + "," + position.coords.longitude;

    window.myLat=position.coords.latitude;
  window.myLng=position.coords.longitude;



// $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+origin+'&key=AIzaSyDkQCNIfRoHq8yCmZpU9J__yKa1ZAbE6GI').then(response => {
//           currentLocation=response.data.results[0].formatted_address;
//           console.log(response.data.results[0].formatted_address);
//           $scope.originLocation=response.data.results[0].formatted_address;
//           });

    var mapOptions = {
        center:{lat:myLat,lng:myLng},
        zoom: 7,
       mapTypeId: google.maps.MapTypeId.ROADMAP

    };

     window.map = new google.maps.Map(document.getElementById('map'), mapOptions);

     window.geocoder = new google.maps.Geocoder;
  window.infowindow = new google.maps.InfoWindow;

geocodeLatLng1(geocoder, map, infowindow);

     console.log(myLat);
     console.log(myLng);

     var marker1Options = {
                position:{lat:myLat, lng:myLng},
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP

            }
            window.marker1 = new google.maps.Marker(marker1Options);

socket.on('sendLocation',function(data){


  console.log(data.msg);


//driver marker
var marker4Options = {
           position:{lat:data.msg.lat, lng:data.msg.lng},
           map: map,
           animation: google.maps.Animation.DROP

       }
       window.marker4 = new google.maps.Marker(marker4Options);

marker4.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


});




            google.maps.event.addListener(marker1, 'dragend', function(evt){
                console.log('Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3));
                window.newLat=evt.latLng.lat().toFixed(3);
                window.newLng=evt.latLng.lng().toFixed(3);

                window.origin=newLat+","+newLng;

geocodeLatLng1(geocoder, map, infowindow);





            });

            google.maps.event.addListener(marker1, 'dragstart', function(evt){
              console.log('Currently dragging marker');
            });


    var input="";
    var destination="";

              input = document.getElementById("inputLoaction");
              destination=document.getElementById("inputDestination");

              var autocompletesource = new google.maps.places.Autocomplete(input);
              autocompletesource.bindTo('bounds', map);

              autocompletesource.addListener('place_changed',onPlaceChangedSource);
              function onPlaceChangedSource(){
                  console.log('Hello changed Source');
                  var place = autocompletesource.getPlace();
                  map.panTo(place.geometry.location);
              }


              var autocompletedestination = new google.maps.places.Autocomplete(destination);
              autocompletedestination.bindTo('bounds', map);
              autocompletedestination.addListener('place_changed',onPlaceChangedDestination);
              function onPlaceChangedDestination(){
  console.log('Hello changed Dest');
                  var place = autocompletedestination.getPlace();
                  map.panTo(place.geometry.location);
              }


              //create a DirectionsService object to use the route method and get a result for our request
  window.directionsService = new google.maps.DirectionsService();

    //create a DirectionsRenderer object which we will use to display the route
    // window.directionsDisplay = new google.maps.DirectionsRenderer();

    //bind the DirectionsRenderer to the map
    // directionsDisplay.setMap(map);
}




function geocodeLatLng1(geocoder, map, infowindow) {
  var input =origin;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        // var marker = new google.maps.Marker({
        //   position: latlng,
        //   map: map
        // });
        infowindow.setContent(results[1].formatted_address);
document.getElementById("inputLoaction").value=results[1].formatted_address.toString();


// $scope.originLocation=results[1].formatted_address.toString();

        infowindow.open(map, marker1);

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

// function geocodeLatLng2(geocoder, map, infowindow) {
//   var input =newPos;
//   var latlngStr = input.split(',', 2);
//   var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
//   geocoder.geocode({'location': latlng}, function(results, status) {
//     if (status === 'OK') {
//       if (results[1]) {
//         map.setZoom(11);
//         // var marker = new google.maps.Marker({
//         //   position: latlng,
//         //   map: map
//         // });
//         infowindow.setContent(results[1].formatted_address);
// document.getElementById("inputLoaction").value=results[1].formatted_address.toString();
//         infowindow.open(map, marker1);
//
//       } else {
//         window.alert('No results found');
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status);
//     }
//   });
// }












}
    //define calcRoute function


$scope.calcRoute=function(){

      var distance;
      var duration;

     input="";
     destination="";
     input = document.getElementById("inputLoaction").value;
     console.log(`Input is:${input}`);
     destination=document.getElementById("inputDestination").value;
     console.log(`Destination is:${destination}`);




     distance=document.getElementById("distance");
     duration=document.getElementById("duration");



       var request = {
           origin: input,
           destination: destination,
           travelMode: google.maps.TravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem.METRIC
       }

       //pass the request to the route method
       directionsService.route(request, function(result, status){
       if(status == google.maps.DirectionsStatus.OK){
           console.log(result);

           //Get distance and time

           distance.value=result.routes[0].legs[0].distance.text;
           duration.value=result.routes[0].legs[0].duration.text;
           //display route
          //  directionsDisplay.setDirections(result);
       }
       });
    }

    $(document).ready(function(){
      $("#bookingDate").datepicker({
         showAnim: "fadeIn",

       numberOfMonths: 1,
         dateFormat: "dd MM yy",
         minDate: +0,
         maxDate: "1D",
       });
$('#bookingTime').bootstrapMaterialDatePicker({
  format : 'HH:mm',
  date:false,
 time:true,
  });


    });




  });
