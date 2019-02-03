(function () {
    'use strict';
    angular.module("app").controller("TrocarGrupoDialogController", TrocarGrupoDialogController);


    TrocarGrupoDialogController.$inject = ["$scope", "$mdDialog", "Usuario"];

    function TrocarGrupoDialogController($scope, $mdDialog, Usuario) {
        var vm = this;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        vm.grupo = Usuario.getUsuario().grupo;
        vm.grupos = [{
                codigo: 1,
                nome: "Aguas Claras"
            },
            {
                codigo: 2,
                nome: "Esplanada"
            }
        ];
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        vm.answer = function (form) {

            $mdDialog.hide(vm.grupo);
        };
    }

})();