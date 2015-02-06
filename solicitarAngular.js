/**
* solicitar Module
*
* Description
*/
angular.module('solicitarApp', []).controller('solicitarCtrl', ['$scope', function ($scope) {
	$scope.accesorios = [{nombre:"Panel Solar" , descripcion:"Un panel solar (o módulo solar) es un dispositivo que aprovecha la energía de la radiación solar. El término comprende a los colectores solares utilizados para producir agua caliente (usualmente doméstica) mediante energía solar térmica y a los paneles fotovoltaicos utilizados para generar electricidad mediante energía solar fotovoltaica.",imagen:"panel_solar.png"},
  {nombre:"Ventilador eolico" , descripcion:"La explotación de una turbina de 1 MW instalada en un parque eólico puede llegar a evitar 2000 toneladas de dióxido de carbono (CO2), si la electricidad producida ha sido emitida por centrales termoeléctricas.",imagen:"ventilador.png"},{nombre:"Panel Solar" , descripcion:"Un panel solar (o módulo solar) es un dispositivo que aprovecha la energía de la radiación solar. El término comprende a los colectores solares utilizados para producir agua caliente (usualmente doméstica) mediante energía solar térmica y a los paneles fotovoltaicos utilizados para generar electricidad mediante energía solar fotovoltaica.",imagen:"panel_solar.png"}];

}])


