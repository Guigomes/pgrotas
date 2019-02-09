(function () {
    'use strict';
    angular.module("app").controller("ConversasController", ConversasController);


    ConversasController.$inject = ['Chat', 'User', '$scope', '$state', 'Usuario', 'Conversa', 'Toast'];

    function ConversasController(Chat, User, $scope, $state, Usuario, Conversa, Toast) {
        var vm = this;

        vm.listarUsuariosConversa = listarUsuariosConversa;

        vm.abrirConversa = abrirConversa;


        $scope.$on('load', function (e) {
            vm.usuario = Usuario.getUsuario();
            listarConversas();
        });


        function abrirConversa(conversa) {
            Conversa.setConversa(conversa);
            $state.go('app.chat');
        }


        function listarConversas() {
            Chat.listarConversas().then(function (response) {
                vm.conversas = response;
                $scope.$apply();
            }, function (erro) {
                Toast.mostrarErro(erro);
            });
        }

        function listarUsuariosConversa() {
            User.listarUsuariosConversa().then(function (usuariosConversa) {
                vm.usuariosConversa = []
                for (var i in usuariosConversa) {
                    if (Usuario.getUsuario().id != i) {
                        usuariosConversa[i].id = i;
                        vm.usuariosConversa.push(usuariosConversa[i]);
                    }
                }

                $state.go("app.listar-usuarios-conversas", {
                    usuariosConversa: vm.usuariosConversa
                })

            });
        }

    }

})();