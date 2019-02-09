(function () {
    'use strict';

    angular.module("app").controller("GrupoController", GrupoController);

    GrupoController.$inject = ["$scope", "Usuario", 'Progress', "User", "ngClipboard"];

    function GrupoController($scope, Usuario, Progress, User, ngClipboard) {
        var vm = this;
        vm.copiarCodigoJogador = copiarCodigoJogador;

        $scope.$on('load', function (e) {
            vm.usuario = Usuario.getUsuario();
            carregarGrupo();

        });

        function carregarGrupo() {
            console.log("Init grupo");
            Progress.show();
            $scope.menu.title = vm.usuario.grupo == 1 ? "Ginásios de Aguas Claras" : "Ginários da Esplanada";
            listarJogadores();
        }

        function copiarCodigoJogador(jogador) {
            ngClipboard.toClipboard(jogador.codigo, jogador.nome);
        }

        function listarJogadores() {
            if (vm.usuario.grupo == 1) {
                User.listarJogadores().then((grupo) => {

                    vm.grupo = [];

                    for (var i in grupo) {
                        vm.grupo.push(grupo[i].jogador);
                    }

                    User.listarUsuarios(vm.usuario.grupo).then(function (usuarios) {
                        vm.usuarios = [];

                        for (var i in usuarios) {
                            vm.usuarios.push(usuarios[i]);
                        }
                        Progress.hide();

                    });

                });
            } else {
                User.listarUsuarios(vm.usuario.grupo).then(function (usuarios) {
                    vm.usuarios = [];
                    vm.grupo = [];

                    for (var i in usuarios) {
                        vm.usuarios.push(usuarios[i]);
                    }
                    Progress.hide();
                });

            }
        }



    }

})();