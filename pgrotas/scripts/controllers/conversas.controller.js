(function () {
    'use strict';
    angular.module("app").controller("ConversasController", ConversasController);


    ConversasController.$inject = ['Chat', 'User', '$scope', '$state', 'Usuario', 'Conversa'];

    function ConversasController(Chat, User, $scope, $state, Usuario, Conversa) {
        var vm = this;
        vm.listarUsuariosConversa = listarUsuariosConversa;
        vm.abrirConversa = abrirConversa;


        function abrirConversa(conversa) {
            Conversa.setConversa(conversa);

            $state.go('chat');
        }


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
                    if (Usuario.getUsuario().id != i) {
                        usuariosConversa[i].id = i;

                        vm.usuariosConversa.push(usuariosConversa[i]);
                    }
                }

                $state.go("listar-usuarios-conversas", {
                    usuariosConversa: vm.usuariosConversa
                })

            });
        }

    }

})();