function marcarLineas(){

    var dist  = 9999999999;
    var marcaMasCercana ;
    var ubicacion = document.getElementById('ubicacion').value;
    console.log(ubicacion);
    if(markers[0]==undefined ){
      alert("Debe seleccionar una posicion en el mapa.")
    } else  {
      casasExistentes.forEach(function(marker) {
          var distancia = Dist(marker.lat,marker.lon,markers[0].position.k,markers[0].position.D);
          var beachMarker = new google.maps.Marker({
            position: new google.maps.LatLng(marker.lat,+marker.lon),
            map: map,
            icon: 'casa2.png',
          });
          if(parseInt(distancia) < parseInt(dist)){
            marcaMasCercana = marker;
            dist = distancia;
          }
      });
      var ruta = [new google.maps.LatLng(markers[0].position.k, markers[0].position.D),
                    new google.maps.LatLng(marcaMasCercana.lat, marcaMasCercana.lon)];
      polylineas = new google.maps.Polyline({        
        path: ruta,
        map: map, 
        strokeColor: '#FF0000', 
        strokeWeight: 4,  
        strokeOpacity: 0.6, 
        clickable: false     });
    }
  }
function buscarCaminos(){
    var ubicacion = document.getElementById('ubicacion').value;
    if(markers[0]!=undefined){

       obtenerNombre(markers[0].position.k,markers[0].position.D)

    } else if(ubicacion!=""){
      
      obtenerCoordenadas(ubicacion);

    } else {
             $( "#dialog" ).dialog( "open" );

      //alert("Debe seleccionar una posicion en el mapa o escribir una ubicacion.")
    }
  }


function obtenerNombre(lat,lng){
  var latLng = new google.maps.LatLng(lat,lng);

  geocoder.geocode( { 'latLng': latLng}, function(results, status) {
         
        //si el estado de la llamado es OK
        if (status == google.maps.GeocoderStatus.OK) {
            obtenerCamino(results[0]);
           
      } else {
          //si no es OK devuelvo error

          alert("No podemos encontrar la direcci&oacute;n, error: " + status);
      }
    });
}


function obtenerCoordenadas(ubicacion){
  console.log(ubicacion);
  geocoder.geocode( { 'address': ubicacion}, function(results, status) {
         
        //si el estado de la llamado es OK
        if (status == google.maps.GeocoderStatus.OK) {
            //centro el mapa en las coordenadas obtenidas
            map.setCenter(results[0].geometry.location);

            origen = {position: results[0].geometry.location};
            //coloco el marcador en dichas coordenadas
            console.log(results[0].geometry.location);
            var marca =results[0] ;
            obtenerCamino(marca);
        } else {
          //si no es OK devuelvo error
          alert("No podemos encontrar la direcci&oacute;n, error: " + status);
        }
      });
}
function obtenerCamino(origen){
  var dist  = 9999999999;
  var marcaMasCercana ;
  var mejorRespuesta  ;

  casasExistentes.forEach(function(marker) {
      var distancia = Dist(marker.lat,marker.lon,origen.geometry.location.k,origen.geometry.location.D);
      var beachMarker = new google.maps.Marker({
        position: new google.maps.LatLng(marker.lat,+marker.lon),
        map: map,
        icon: 'casa2.png',
      });
      if(parseInt(distancia) < parseInt(dist)){
        marcaMasCercana = marker;
        dist = distancia;
      }
  });
  console.log(origen.formatted_address);
  var request = {
   origin: origen.formatted_address,
   destination: marcaMasCercana.lat+","+marcaMasCercana.lon,
   travelMode: google.maps.TravelMode.DRIVING,
   unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
   };
   
  
  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setMap(map);
          //directionsDisplay.setPanel($("#panel_ruta").get(0));
          directionsDisplay.setDirections(response);
          if(markers[0]!=undefined) {markers[0].setMap(null);}

          var efectos = $("#ubicacion-contenedor").animate({backgroundColor:"#CDEB8B"},1000);
          $(".progreso1").animate({backgroundColor:"#CDEB8B"},1000);
          $(".progreso2").animate({backgroundColor:"#C3D9FF"},1000);
          $("#accesorios").animate({backgroundColor:"#C3D9FF"},1000);
          setTimeout(function(){
            $("#l2").click();
          },2200);
          
      } else {
              alert("No se encontro ninguna camino que llege a "+origen.formatted_address+" por favor seleccione una ubicacion mas cercana a una ruta o ciudad.");
      }
  });  
}

function Dist(lat1, lon1, lat2, lon2)
  {
    rad = function(x) {return x*Math.PI/180;}

    var R     = 6378.137;                          //Radio de la tierra en km
    var dLat  = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d.toFixed(3);                      //Retorna tres decimales
  }

  $(function() {
    $( "#dialog" ).dialog({

      draggable: false,
      resizable: false,
      dialogClass: 'ui-dialog-osx',
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      },
      
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
    });
  });



  $(document).ready(function(){
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        if($target.selector=="#ubicacion-contenedor"){targetOffset=0;}
        $('html,body')
        .stop().animate({scrollTop: targetOffset}, 1300, 'easeInCirc');
       return false;
      }
    }
  });

  
});