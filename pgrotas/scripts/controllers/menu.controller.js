(function () {
    'use strict';
    angular.module("app").controller("MenuController", MenuController);


    MenuController.$inject = ['$mdSidenav', '$mdDialog', '$scope', '$state', 'Progress', "User", "Usuario", "Toast"];

    function MenuController($mdSidenav, $mdDialog, $scope, $state, Progress, User, Usuario, Toast) {
        var vm = this;

        vm.toggle = toggle;

        vm.trocarGrupo = trocarGrupo;

        vm.editarDados = editarDados;

        vm.sair = sair;

        vm.logado = true;



        init();


        function init() {
            Progress.show();

            $scope.menu = {};

            vm.logado = true;

            return firebase.auth().onAuthStateChanged(
                function (user) {
                    if (user) {
                        _usuarioLogado(user);
                    } else {
                        _usuarioNaoLogado();
                    }
                },
                function (error) {
                    Toast.mostrarErro(error);

                }
            );
        }

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
                        if (novoGrupo != Usuario.getUsuario().grupo) {
                            Progress.show();
                            vm.usuario = Usuario.getUsuario();
                            vm.usuario.grupo = novoGrupo;
                            Usuario.setUsuario(vm.usuario);
                            $scope.$broadcast('load');

                        }
                    }
                );
        };


        function editarDados() {
            __abrirModalCadastro(true);

        }


        function sair() {
            firebase.auth().signOut().then(
                function () {
                    vm.logado = false;
                    $state.go("/app/home");
                },
                function (error) {
                    Toast.mostrarErro(error);
                }
            );
        }

        function salvarAlterarUsuario(novoUsuario) {
            Progress.show();

            if (Usuario.getUsuario() === undefined) {
                novoUsuario.email = vm.user.email;
                User.adicionarUsuario(
                    novoUsuario
                ).then(
                    (id) => {
                        Toast.mostrarMensagem("Seja bem vindo " + novoUsuario.nome);
                        novoUsuario.id = id;
                        vm.usuario = novoUsuario;
                        $scope.menu.usuario = novoUsuario;
                        Usuario.setUsuario(vm.usuario);
                        $scope.$apply();
                        $scope.$broadcast('load');
                    },
                    erro => {
                        Toast.mostrarErro(erro);
                    }
                );
            } else {
                User.alterarUsuario(
                    novoUsuario
                ).then(
                    () => {
                        Toast.mostrarMensagem("Seus dados foram alterados com sucesso");
                        Usuario.setUsuario(novoUsuario);
                        vm.usuario = novoUsuario;
                        $scope.$broadcast('load');

                        Progress.hide();
                    },
                    erro => {
                        Toast.mostrarErro(erro);
                    }
                );
            }
        }

        function __abrirModalCadastro(editar) {

            $mdDialog
                .show({
                    controller: "CadastroDialogController",
                    controllerAs: "vm",
                    templateUrl: "pages/cadastro-dialog.html",
                    parent: angular.element(document.body),
                    clickOutsideToClose: editar == true,
                    fullscreen: $scope.customFullscreen
                })
                .then(
                    function (novoUsuario) {
                        salvarAlterarUsuario(novoUsuario);
                    }
                ),
                function (error) {
                    Toast.mostrarErro(error);
                };
        }

        function _usuarioLogado(user) {
            try {
                let userId = firebase.auth().currentUser.uid;
                User.buscarUsuario(userId).then(function (usuario) {

                        if (usuario == null) {
                            vm.user = user;
                            Progress.hide();
                            __abrirModalCadastro();

                        } else {
                            usuario.id = userId;
                            vm.usuario = usuario;
                            $scope.menu.usuario = usuario;
                            Usuario.setUsuario(usuario);
                            $scope.$broadcast('load');
                            Progress.hide();
                            messageToken();
                        }
                    },
                    function (error) {
                        Toast.mostrarErro("Erro ao buscar usuário " + JSON.stringify(error));
                    })
            } catch (err) {
                Toast.mostrarErro(err);
            }
        }

        function _usuarioNaoLogado() {

            vm.logado = false;
            var uiConfig = {
                signInSuccessUrl: "/",
                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                tosUrl: "<your-tos-url>",
                privacyPolicyUrl: function () {
                    window.location.assign("<your-privacy-policy-url>");
                }
            };
            vm.ui = firebaseui.auth.AuthUI.getInstance();
            if (!vm.ui) {
                vm.ui = new firebaseui.auth.AuthUI(firebase.auth());
            }
            vm.ui.start("#firebaseui-auth-container", uiConfig);
            Progress.hide();

        }



        function messageToken() {

            var messaging = firebase.messaging();
            console.log("On message ligador");
            messaging.onMessage(function (payload) {
                alert("UHUU");
                console.log('Message received. ', payload);

            });
            console.log("Entrar getToken");
            messaging.usePublicVapidKey("BCGwZEs7nsIbkiuJE_gHwxnfBjReLr3RJ0X4Y4XHi5gRFy9JBt_3SvAFBfx7K2Tz5cqEWBMg_zziT98xDh8LtDE");
            messaging.requestPermission().then(function () {

                messaging.getToken().then(function (currentToken) {
                    if (currentToken) {
                        console.log("Sai getToken", currentToken);
                        Usuario.getUsuario().messageToken = currentToken;
                        User.alterarUsuario(
                            Usuario.getUsuario()
                        ).then(
                            () => {
                                console.log('Token generated.');

                                Progress.hide();
                            },
                            erro => {
                                Toast.mostrarErro(erro);
                            }
                        );
                    }
                }).catch(function (err) {
                    console.log("Erro token", err);
                    console.log('An error occurred while retrieving token. ', err);

                });
            }).catch(function (err) {
                console.log("Pemissao Negada");
            });



            messaging.onTokenRefresh(function () {
                messaging.getToken().then(function (refreshedToken) {

                    Usuario.getUsuario().messageToken = refreshedToken;
                    User.alterarUsuario(
                        Usuario.getUsuario()
                    ).then(
                        () => {
                            console.log('Token refreshed.');


                            Progress.hide();
                        },
                        erro => {
                            Toast.mostrarErro(erro);
                        }
                    );
                    // Indicate that the new Instance ID token has not yet been sent to the
                    // app server.
                    // setTokenSentToServer(false);
                    // Send Instance ID token to app server.
                    // sendTokenToServer(refreshedToken);
                    // ...
                }).catch(function (err) {
                    console.log('Unable to retrieve refreshed token ', err);
                    // showToken('Unable to retrieve refreshed token ', err);
                });
            });
            console.log("FINSL");
        }



    }

})();