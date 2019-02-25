(function () {
    'use strict';
    angular.module("app").controller("ConversasController", ConversasController);


    ConversasController.$inject = ['Chat', 'User', '$scope', '$state', 'Usuario', 'Cache', 'Toast'];

    function ConversasController(Chat, User, $scope, $state, Usuario, Cache, Toast) {
        var vm = this;

        vm.listarUsuariosConversa = listarUsuariosConversa;

        vm.abrirConversa = abrirConversa;


        $scope.$on('load', function (e) {
            vm.usuario = Usuario.getUsuario();
            listarConversas();
        });

        initCache();

        function initCache() {
            if (Cache.getConversas() != undefined) {
                vm.conversas = Cache.getConversas();
            }
        }

        function abrirConversa(conversa) {
            Cache.setConversaAtual(conversa);
            $state.go('app.chat');
        }


        function listarConversas() {
            Chat.listarConversas().then(function (response) {
                vm.conversas = response;
                Cache.setConversas(response);
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