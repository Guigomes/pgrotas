(function () {
    'use strict';

    angular.module("app").controller("GinasiosDialogController", GinasiosDialogController);
    angular.module("app").filter("ginasiosFilter", ginasiosFilter);

    GinasiosDialogController.$inject = ["$mdDialog", "Usuario", "Ginasios", "Cache"];

    function ginasiosFilter() {
        return function (items, text) {

            if (text != undefined && text.length > 0) {

                text = text.toLowerCase();
                var filtered = [];

                for (var i = 0; i < items.length; i++) {

                    var itemNome = items[i].nome.toLowerCase();
                    if (items[i].codigo == text || itemNome.indexOf(text) != -1) {
                        filtered.push(items[i]);
                    }

                }
                return filtered;
            } else {
                return items;
            }
        };

    }


    function GinasiosDialogController($mdDialog, Usuario, Ginasios, Cache) {
        var vm = this;

        vm.escolherLocal = escolherLocal;
        vm.hide = function () {
            $mdDialog.hide();
        };


        vm.cancel = function () {
            $mdDialog.cancel();
        };
        initMapas();

        function escolherLocal(local) {
            $mdDialog.hide(local);
        }

        function initMapas() {
            vm.usuario = Usuario.getUsuario();
            vm.locais = vm.usuario.grupo == 1 ? Ginasios.getGinasiosAguasClaras() : Ginasios.getGinasiosEsplanada();
            Cache.setGinasios(vm.locais);
            vm.localSelecionado = vm.locais[0];

        }

    }

})();