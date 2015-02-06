 
var casasExistentes = [{lat :-36.6684189189478, lon : -64.259033203125}
                      ,{lat :-42.32200108060304 , lon :   -70.037841796875}
                      ,{lat :-36.870832155646305, lon :  -59.886474609375}] ;

var markers = [];
var polylineas ;
var mapOptions = {
  center: new google.maps.LatLng(-36.6, -64.644),
  zoom: 5,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;

var geocoder = new google.maps.Geocoder();
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();


function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);

   casasExistentes.forEach(function(marker) {
     var beachMarker = new google.maps.Marker({
            position: new google.maps.LatLng(marker.lat,+marker.lon),
            map: map,
            icon: 'casa2.png',
          });
   });

  google.maps.event.addListener(map, 'click', function(event) {
    setAllMap(null);
    setAllMapLineas(null);
    markers = [];
    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      animation: google.maps.Animation.BOUNCE,
      title: 'Hello World!'
    });

    marker.setAnimation(google.maps.Animation.BOUNCE);
    //document.getElementById('posicion').value = event.latLng;
    markers.push(marker);
  });



  function setAllMapLineas(map) {
    if(polylineas!=undefined)
        polylineas.setMap(map);
  }
}

  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

