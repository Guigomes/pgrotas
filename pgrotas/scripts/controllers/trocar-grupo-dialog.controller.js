(function () {
    'use strict';
    angular.module("app").controller("TrocarGrupoDialogController", TrocarGrupoDialogController);

    function TrocarGrupoDialogController($scope, $mdDialog, $mdToast) {
        var vm = this;
        $scope.hide = function () {
            $mdDialog.hide();
        };

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