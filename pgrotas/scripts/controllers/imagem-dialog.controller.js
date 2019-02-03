(function () {
    'use strict';

    angular.module("app").controller("ImagemDialogController", ImagemDialogController);

    ImagemDialogController.$inject = ["$scope", "$mdDialog", "Usuario"];

    function ImagemDialogController($scope, $mdDialog, Usuario) {
        var vm = this;

        vm.imagem = Usuario.getUsuario().grupo == 1 ? "mapa.jpg" : "mapa-esplanada.jpeg";

        vm.hide = function () {
            $mdDialog.hide();
        };


        vm.cancel = function () {
            $mdDialog.cancel();
        };


    }

})();