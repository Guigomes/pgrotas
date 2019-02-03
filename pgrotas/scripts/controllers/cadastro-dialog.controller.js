(function () {
    'use strict';

    angular.module("app").controller("CadastroDialogController", CadastroDialogController);

    function CadastroDialogController($scope, $mdDialog, $mdToast, Usuario) {
        var vm = this;

        vm.usuario = Usuario.getUsuario();
        if (vm.usuario !== undefined && vm.usuario.codigo !== undefined) {
            vm.usuario.codigo1 = vm.usuario.codigo.substring(0, 4);
            vm.usuario.codigo2 = vm.usuario.codigo.substring(5, 9);
            vm.usuario.codigo3 = vm.usuario.codigo.substring(10, 14);
            vm.podeCancelar = true;
            vm.title = "Editar meus dados";
        } else {
            vm.usuario = {};
            vm.usuario.mensagens = true;
            vm.title = "Novo jogador";
        }



        $scope.hide = function () {
            $mdDialog.hide();
        };

        vm.times = [{
                codigo: 1,
                nome: "Valor"
            },
            {
                codigo: 2,
                nome: "Mistic"
            },
            {
                codigo: 3,
                nome: "Instinto"
            }
        ];

        vm.grupos = [{
                codigo: 1,
                nome: "Aguas Claras"
            },
            {
                codigo: 2,
                nome: "Esplanada"
            }
        ];
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.answer = function (form) {
            if (!form.$valid) {
                $mdToast.show(
                    $mdToast
                    .simple()
                    .textContent("Por favor, informe todos os campos obrigatórios.")
                    .position("bottom")
                    .hideDelay(3000)
                );
            } else {
                if (vm.nivel === undefined || vm.nivel === "" || (vm.nivel > 0 && vm.nivel <= 40)) {

                    vm.usuario.codigo = vm.usuario.codigo1 + " " + vm.usuario.codigo2 + " " + vm.usuario.codigo3
                    $mdDialog.hide(vm.usuario);
                } else {
                    $mdToast.show(
                        $mdToast
                        .simple()
                        .textContent("Por favor, informe um nivel entre 1 e 40.")
                        .position("bottom")
                        .hideDelay(3000)
                    );
                }
            }
        };
    }

})();