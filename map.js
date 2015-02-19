 
var casasExistentes = casas = JSON.parse(window.localStorage['casas'] || '[]');

var markers = [];
var polylineas ;
var mapOptions = {
  center: new google.maps.LatLng(-36.6, -64.644),
  zoom: 5,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;

var geocoder = new google.maps.Geocoder();



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
function agregarMarca(marker){

    var beachMarker = new google.maps.Marker({
        position: new google.maps.LatLng(marker.position.k,+marker.position.D),
        map: map,
        icon: 'casa2.png',
      });

    markers.push(beachMarker);


  }
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

