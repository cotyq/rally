/**
* solicitar Module
*
* Description
*/
angular.module('solicitarApp', []).controller('solicitarCtrl', ['$scope', function ($scope) {
	$scope.accesorios = [{nombre:"Panel Solar" , descripcion:"Un panel solar (o módulo solar) es un dispositivo que aprovecha la energía de la radiación solar. El término comprende a los colectores solares utilizados para producir agua caliente (usualmente doméstica) mediante energía solar térmica y a los paneles fotovoltaicos utilizados para generar electricidad mediante energía solar fotovoltaica.",imagen:"panel_solar.png",cantidad:0},
  {nombre:"Ventilador eolico" , descripcion:"La explotación de una turbina de 1 MW instalada en un parque eólico puede llegar a evitar 2000 toneladas de dióxido de carbono (CO2), si la electricidad producida ha sido emitida por centrales termoeléctricas.",cantidad:0,imagen:"ventilador.png"},
  {nombre:"Termotanque" , descripcion:"Dispositivo eléctrico o de gas empleado para calentar el agua corriente para su uso doméstico. Algunos son capaces de producir esta calefacción bajo demanda, mientras que otros almacenan una determinada cantidad de agua precalentada.",imagen:"termotanque.jpg",cantidad:0},
  {nombre:"Aislamiento térmico: Lana de vidrio" , descripcion:"La lana de vidrio es una fibra mineral fabricada con millones de filamentos de vidrio unidos con un aglutinante. El espacio libre con aire atrapado entre las fibras aumentan la resistencia a la transmisión de calor.",imagen:"lana.jpg",cantidad:0},
  {nombre:"Aislante termico: Lana de roca" , descripcion:"La lana de roca, perteneciente a la familia de las lanas minerales, es un material fabricado a partir de la roca volcánica. Se utiliza principalmente como aislamiento térmico y como protección pasiva contra el fuego en la edificación, debido a su estructura fibrosa multidireccional, que le permite albergar aire relativamente inmóvil en su interior.",cantidad:0,imagen:"lanaroca.jpg"}];
  var cantidad=0;
  $scope.progreso=1;
  $scope.model_fechaActual = new Date();
  $scope.accesoriosFiltrados=[];

  $scope.confirmar = function(){
   window.localStorage['casas']=JSON.stringify(casasExistentes);
  }

  $scope.marcarMapa = function(){
    if($scope.progreso==1){
      $scope.model_ubicacion='Marca'
     
    };
  }
 $scope.validarAccesorios = function(){
   if($scope.progreso==2){
    $scope.completado=true;
    $("#accesorios").animate({backgroundColor:"#CDEB8B"},1000);

    $(".progreso2").switchClass('col-md-6','col-md-3',1000)

    $(".progreso2").animate({backgroundColor:"#CDEB8B"},1000);
    $("#verificacion").animate({backgroundColor:"#C3D9FF"},1000);

    angular.forEach($scope.accesorios, function(value,key){
      if(value.cantidad>0){
        $scope.accesoriosFiltrados.push(value);
      }
    });
    $scope.$apply();

    setTimeout(function(){
	      /*$("#l2").click();
	      $(".progreso1").css("border-left","solid 0px");
	      $(".progreso2").css("border-left","solid 20px",1000);*/
	      $(".progreso3").switchClass('col-md-3','col-md-6',1000)
	      $(".progreso3").animate({backgroundColor:"#C3D9FF"},1000);
	      document.getElementById("progreso2_estado").innerHTML ="Completado";


	    },1500);
  }  else  {
    alert("Debes indicar primero la ubicacion de tus casas.")
  }

}

function marcarLineas(){

  var dist  = 9999999999;
  var marcaMasCercana ;
  var ubicacion = document.getElementById('ubicacion').value;
  cantidad = document.getElementById('cantidad').value;

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
  cantidad = document.getElementById('cantidad').value;

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
          
          $scope.model_ubicacion=results[0].formatted_address;

          console.log(results[0].formatted_address);
          $scope.$apply()

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


      casasSeleccionadas = [];

      for (var i = cantidad; i > 0; i--) {
        var dist  = 9999999999;
        
        var index = 0;
        var j=0;
        var marcaMasCercana ;
        casasExistentes.forEach(function(marker) {

          var distancia = Dist(marker.lat,marker.lon,origen.geometry.location.k,origen.geometry.location.D);
          var beachMarker = new google.maps.Marker({
            position: new google.maps.LatLng(marker.lat,+marker.lon),
            map: map,
            icon: 'casa2.png',
          });
          if(parseInt(distancia) < parseInt(dist) && 
            (marker.hasta == undefined 
              || Date.parse(marker.hasta) < Date.parse($scope.model_desde))){
            marcaMasCercana = marker;
            dist = distancia;
            index=j;
          }
          j++;
        });
        if(marcaMasCercana!=undefined){
          casasExistentes[index].hasta = $scope.model_hasta;
          casasExistentes[index].desde = $scope.model_desde;
          casasSeleccionadas.push(marcaMasCercana);
          marcaMasCercana=undefined;
          cantidad--;
        }
      };
      if(cantidad==0){
        casasSeleccionadas.forEach(function(casa){
         console.log(origen.formatted_address);
         if(casa!=undefined){
          var request = {
           origin: origen.formatted_address,
           destination: casa.lat+","+casa.lon,
           travelMode: google.maps.TravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem.METRIC,
           avoidHighways: false,
           avoidTolls: false};

           var directionsDisplay = new google.maps.DirectionsRenderer();
           var directionsService = new google.maps.DirectionsService();

           directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setMap(map);
              directionsDisplay.setPanel($("#panel_ruta").get(0));
              directionsDisplay.setDirections(response);
              if(markers[0]!=undefined) {markers[0].setMap(null);}
              $scope.progreso=2;

              $scope.completado1=true;

            }
          });

         } else {
          alert("No se encontro ninguna camino que llege a "+origen.formatted_address+" por favor seleccione una ubicacion mas cercana a una ruta o ciudad.");
        }
      }); 

var efectos = $("#ubicacion-contenedor").animate({backgroundColor:"#CDEB8B"},1000);

$(".progreso1").switchClass('col-md-6','col-md-3',1000)

$(".progreso1").animate({backgroundColor:"#CDEB8B"},1000);
$("#accesorios").animate({backgroundColor:"#C3D9FF"},1000);

$(".reporteVyV").css('visibility', 'visible');


setTimeout(function(){
            /*$("#l2").click();
            $(".progreso1").css("border-left","solid 0px");
            $(".progreso2").css("border-left","solid 20px",1000);*/
            $(".progreso2").switchClass('col-md-3','col-md-6',1000)
            $(".progreso2").animate({backgroundColor:"#C3D9FF"},1000);
            document.getElementById("progreso1_estado").innerHTML ="Completado";
            

          },1500);
}  else {
  alert("no alcanzan las casas para abastecer en ese periodo.")
}


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
        if($target.selector=="#ubicacion-contenedor"){targetOffset=0;}else{
          //  targetOffset-=100;
        }
        $('html,body')
        .stop().animate({scrollTop: targetOffset}, 1300, 'easeOutCubic');
        return false;
      }
    }
  });


  });

  $(function() { //shorthand document.ready function
    $('#form_ubicacion').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        buscarCaminos();         
      });
    $('#ubicacion').on('input',function(e){
      setAllMap(null);

      markers=[];
    });



    $(window).scroll(function(){
      if($('.accesorios').offset().top > $(window).scrollTop()+200){
        $('#accesorios_tabla').addClass('animated fadeInUp');
      }
    });
  });
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
}])


