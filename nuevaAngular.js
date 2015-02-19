angular.module('casasApp', ['ui-notification']).controller('casasCtrl',  function ($scope,Notification) {

	$(function() { 
		$('#form-crearCasa').on('submit', function(e) { //use on if jQuery 1.7+
			e.preventDefault();
			var casa=[];
			casa ={serie:$scope.nSerie,lat :markers[0].position.k, lon :  markers[0].position.D };
			var casas = JSON.parse(window.localStorage['casas'] || '[]');

			casas.push(casa);
			window.localStorage['casas']=JSON.stringify(casas);
			

			Notification.success('La casa N°'+$scope.nSerie +' a sido registrada en el sistema.');
			//alert("La casa N°"+$scope.nSerie +" a sido registrada en el sistema.")

			$scope.nSerie="";
			
			if(markers[0]!=undefined) { agregarMarca(markers[0])};
			if(markers[0]!=undefined) {markers[0].setMap(null);}
			$scope.$apply();
		});
	});
}
);