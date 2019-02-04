(function () {
    'use strict';
    angular.module("app").controller("MenuController", MenuController);


    MenuController.$inject = ['$mdSidenav', '$mdDialog', '$scope', '$state', 'Progress', "User", "Usuario", "Toast"];

    function MenuController($mdSidenav, $mdDialog, $scope, $state, Progress, User, Usuario, Toast) {
        var vm = this;

        vm.toggle = toggle;
        vm.trocarGrupo = trocarGrupo;
        vm.abrirConversas = abrirConversas;
        vm.editarDados = editarDados;
        vm.sair = sair;
        vm.logado = true;

        $scope.menu = {};


        function toggle() {
            $mdSidenav("left").toggle();
        }

        function trocarGrupo() {
            $mdDialog
                .show({
                    templateUrl: "pages/dialog-trocar-grupo.html",
                    controller: "TrocarGrupoDialogController",
                    controllerAs: "vm",
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(
                    function (novoGrupo) {


                        if (novoGrupo != $scope.menu.usuario.grupo) {
                            $scope.menu.usuario.grupo = novoGrupo;
                            console.log("TESTE");
                            $scope.$broadcast('carregarGrupo');

                        }
                    },
                    function () {
                        $scope.status = "You cancelled the dialog.";
                    }
                );
        };


        function abrirConversas() {
            console.log("Conversas");
            $state.go('conversas');
        }

        function editarDados() {
            __abrirModalCadastro(true);

        }

        function __abrirModalCadastro(editar) {

            $mdDialog
                .show({
                    controller: "CadastroDialogController",
                    controllerAs: "vm",
                    templateUrl: "pages/dialog1.tmpl.html",
                    parent: angular.element(document.body),
                    clickOutsideToClose: editar == true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(
                    function (novoUsuario) {

                        if (Usuario.getUsuario() === undefined) {
                            novoUsuario.email = vm.user.email;
                            User.adicionarUsuario(
                                novoUsuario
                            ).then(
                                () => {
                                    Toast.mostrarMensagem("Seja bem vindo " + novoUsuario.nome);
                                    vm.usuario = novoUsuario;
                                    $scope.menu.usuario = novoUsuario;
                                    Usuario.setUsuario(vm.usuario);
                                    carregarGrupo();

                                },
                                erro => {
                                    Toast.mostrarErro(erro);
                                }
                            );
                        } else {
                            Progress.show();
                            User.alterarUsuario(
                                vm.usuario
                            ).then(
                                () => {
                                    Toast.mostrarMensagem("Seus dados foram alterados com sucesso");
                                    Usuario.setUsuario(vm.usuario);
                                    $scope.menu.usuario = vm.usuario;

                                    Progress.hide();
                                },
                                erro => {
                                    Toast.mostrarErro(erro);
                                }
                            );
                        }
                    },
                    function () {
                        $scope.status = "You cancelled the dialog.";
                    }
                );
        }

        function sair() {
            firebase
                .auth()
                .signOut()
                .then(
                    function () {
                        vm.logado = false;
                        $state.go("/");
                    },
                    function (error) {}
                );
        }


    }

})();