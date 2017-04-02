var start;
var end;

function initMap() {
    var ucla = {
        lat: 34.0689,
        lng: -118.4452
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: ucla
    });
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
            // var loc = new google.maps.Marker({ //I think this location thing gives us our current location so we need this  as our starting coordinate
            start = new google.maps.Marker({
                position: pos,
                map: map
            });
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        console.log("Location found!");

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('end-loc')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    // var place = autocomplete.getPlace(); //so this place variable is our ending coordinate, what we need to do is get these geocoordinates so we can use this in the navigation part
       end = autocomplete.getPlace();
}

//
function initDirectionsMap() {

  // console.log(start);
  // console.log(end);
     console.log('.....')
 var pointA = new google.maps.LatLng(34.0689, -118.4452),
     pointB = new google.maps.LatLng(34.0224, -118.2851),
 // var pointA = start,
 //     pointB = end,
     myOptions = {
         zoom: 7,
         center: pointA

     },
    //  map = new google.maps.Map(document.getElementById('map-canvas'), myOptions, alternates = true),
         map = new google.maps.Map(document.getElementById('map'), myOptions, alternates = true),
        //  if (map ==null){
        //    console.log('I am null and you fucked up')
        //  }
     // Instantiate a directions service.
     directionsService = new google.maps.DirectionsService,
     directionsDisplay = new google.maps.DirectionsRenderer({
         map: map
     }),
     markerA = new google.maps.Marker({
         position: pointA,
         title: "point A",
         label: "A",
         map: map
        //  console.log('I am MakerA')
     }),


     markerB = new google.maps.Marker({
         position: pointB,
         title: "point B",
         label: "B",
         map: map
        //  console.log('I am MakerB')
     });


     console.log('***************')

 // get route from A to B
 calculateAndDisplayRoute(directionsService, directionsDisplay, map, pointA, pointB);

}

function rainbow(iteration){
  var color;
  switch(iteration)
  {
    case 1:
    color = '#0000FF';
    break;
    case 2:
    color = '#00FA9A';
    break;
    case 3:
    color = '#4B0082';
    break;
    case 4:
    color = '#D2691E';
    break;
    case 5:
    color = '#FFD700';
    break;
    case 6:
    color = '#FFA07A';
    break;
    default:
    color = '#9ACD32';
  }
  return color;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, map, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    avoidTolls: true,
    avoidHighways: false,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  }, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK)
    {

      console.log(response.routes);
      for (var i = 0; i < response.routes.length || i<7; i++) {
        var a = 2, b = 1;
        // var directionsD = new google.maps.DirectionsRenderer({map})
        var directionsD = new google.maps.DirectionsRenderer({ map, polylineOptions: { strokeColor: rainbow(i)} });
        directionsD.setDirections(response)
        directionsD.setRouteIndex(i)
      }
      //directionsDisplay.setDirections(response);

    }
    else
    {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function test(){
  console.log('test');
}

function initMain() {
  initMap()
  initAutocomplete()
  var buttonstatus = document.getElementById("inputbutton");
  if (buttonstatus === null){
    console.log('I am null')
  }
  buttonstatus.addEventListener('click', initDirectionsMap);
}
