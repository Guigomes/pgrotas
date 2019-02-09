(function () {
    "use strict";

    angular.module("app").factory("Cache", Cache);

    function Cache($state) {
        var vm = this;


        vm.ginasios;
        vm.usuarios;
        vm.conversas;
        vm.conversaAtual;

        function setGinasios(ginasios) {
            vm.ginasios = ginasios;
        }

        function getGinasios() {
            return vm.ginasios;
        }

        function setUsuarios(usuarios) {
            vm.usuarios = usuarios;
        }

        function getUsuarios() {
            return vm.usuarios;
        }

        function setConversas(conversas) {
            vm.conversas = conversas;
        }

        function getConversas() {
            return vm.conversas;
        }

        function setConversaAtual(conversaAtual) {
            vm.conversaAtual = conversaAtual;
        }

        function getConversaAtual() {
            return vm.conversaAtual;
        }


        return {
            setGinasios: setGinasios,
            getGinasios: getGinasios,
            setUsuarios: setUsuarios,
            getUsuarios: getUsuarios,
            setConversas: setConversas,
            getConversas: getConversas,
            setConversaAtual: setConversaAtual,
            getConversaAtual: getConversaAtual
        };





    }
})();