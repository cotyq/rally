angular.module('casasApp', []).controller('casasCtrl', ['$scope', function ($scope) {

	$(function() { 
		$('#form-crearCasa').on('submit', function(e) { //use on if jQuery 1.7+
			e.preventDefault();
			var casa=[];
			casa ={serie:$('#numeroSerie').val(),lat :markers[0].position.k, lon :  markers[0].position.D };
			var casas = JSON.parse(window.localStorage['casas'] || '[]');

			casas.push(casa);
			window.localStorage['casas']=JSON.stringify(casas);

		});
	});
}
]);