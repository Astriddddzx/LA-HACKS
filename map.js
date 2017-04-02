function initMap() {
        var ucla = {lat: 34.0689, lng: -118.4452};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: ucla
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        
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
            var loc = new google.maps.Marker({
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