(function () {
    'use strict';
    angular.module("app").controller("UsuariosConversaController", UsuariosConversaController);


    UsuariosConversaController.$inject = ["$stateParams", '$state'];

    function UsuariosConversaController($stateParams, $state) {
        var vm = this;

        vm.conversas = $stateParams.usuariosConversa;
        vm.iniciarConversa = iniciarConversa;

        function iniciarConversa(usuarioConversa, idUsuarioConversa) {
            console.log("Usuario Conversa", usuarioConversa);
            $state.go("chat", {
                usuarioConversa: usuarioConversa
            });
        }
    }

})();