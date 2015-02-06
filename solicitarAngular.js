/**
* solicitar Module
*
* Description
*/
angular.module('solicitarApp', ['ui.sortable']).controller('solicitarCtrl', ['$scope', function ($scope) {
	$scope.items = ["One", "Two", "Three"];
	$scope.items2 = ["One2", "Tw2o", "Thre2"];

	$scope.sortableOptionsList = [createOptions('A'), createOptions('B')];
}])


function createOptions (listName) {
    var _listName = listName;
    var options = {
      placeholder: "app",
      connectWith: ".apps-container",
      activate: function() {
          console.log("list " + _listName + ": activate");
      },
      beforeStop: function() {
          console.log("list " + _listName + ": beforeStop");
      },
      change: function() {
          console.log("list " + _listName + ": change");
      },
      create: function() {
          console.log("list " + _listName + ": create");
      },
      deactivate: function() {
          console.log("list " + _listName + ": deactivate");
      },
      out: function() {
          console.log("list " + _listName + ": out");
      },
      over: function() {
          console.log("list " + _listName + ": over");
      },
      receive: function() {
          console.log("list " + _listName + ": receive");
      },
      remove: function() {
          console.log("list " + _listName + ": remove");
      },
      sort: function() {
          console.log("list " + _listName + ": sort");
      },
      start: function() {
          console.log("list " + _listName + ": start");
      },
      stop: function() {
          console.log("list " + _listName + ": stop");
      },
      update: function() {
          console.log("list " + _listName + ": update");
      }
    };
    return options;
  }