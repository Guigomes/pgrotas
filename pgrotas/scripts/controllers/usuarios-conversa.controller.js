(function () {
    'use strict';
    angular.module("app").controller("UsuariosConversaController", UsuariosConversaController);


    UsuariosConversaController.$inject = ["$stateParams", '$state'];

    function UsuariosConversaController($stateParams, $state) {
        var vm = this;

        vm.usuariosConversa = $stateParams.usuariosConversa;
        vm.iniciarConversa = iniciarConversa;

        function iniciarConversa(usuarioConversa) {
            $state.go("app.chat", {
                usuarioConversa: usuarioConversa
            });
        }
    }

})();