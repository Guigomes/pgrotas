(function () {
    'use strict';

    angular.module("app").controller("ImagemDialogController", ImagemDialogController);

    ImagemDialogController.$inject = ["$mdDialog", "Usuario"];

    function ImagemDialogController($mdDialog, Usuario) {
        var vm = this;

        vm.imagem = Usuario.getUsuario().grupo == 1 ? "mapa.jpg" : "mapa-esplanada.jpg";

        vm.hide = function () {
            $mdDialog.hide();
        };


        vm.cancel = function () {
            $mdDialog.cancel();
        };


    }

})();