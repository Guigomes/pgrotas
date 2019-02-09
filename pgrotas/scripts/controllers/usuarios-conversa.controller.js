(function () {
    'use strict';
    angular.module("app").controller("UsuariosConversaController", UsuariosConversaController);


    UsuariosConversaController.$inject = ["$stateParams", '$state', '$window'];

    function UsuariosConversaController($stateParams, $state, $window) {
        var vm = this;

        vm.usuariosConversa = $stateParams.usuariosConversa;
        vm.iniciarConversa = iniciarConversa;
        vm.goback = goback;

        function iniciarConversa(usuarioConversa) {
            $state.go("app.chat", {
                usuarioConversa: usuarioConversa
            });
        }

        function goback() {
            $window.history.back();
        }
    }

})();