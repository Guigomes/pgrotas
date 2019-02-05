(function () {
    'use strict';
    angular.module("app").controller("ConversasController", ConversasController);


    ConversasController.$inject = ['Chat', 'User', '$scope', '$state'];

    function ConversasController(Chat, User, $scope, $state) {
        var vm = this;

        vm.listarUsuariosConversa = listarUsuariosConversa;
        Chat.listarConversas().then(function (response) {
            vm.conversas = response;
            console.log("conversas", vm.conversas);
            $scope.$apply();
        }, function (erro) {
            console.log("ERRO", erro);
        });


        function listarUsuariosConversa() {
            User.listarUsuariosConversa().then(function (usuariosConversa) {
                vm.usuariosConversa = []
                for (var i in usuariosConversa) {
                    vm.usuariosConversa.push(usuariosConversa[i]);
                }

                $state.go("listar-usuarios-conversas", {
                    usuariosConversa: vm.usuariosConversa
                })

            });
        }

    }

})();