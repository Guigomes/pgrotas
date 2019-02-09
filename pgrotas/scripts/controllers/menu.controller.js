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
                        console.log("Logado");
                        _usuarioLogado();
                    } else {
                        console.log("!logado");
                        _usuarioNaoLogado();
                    }
                },
                function (error) {
                    console.log(error);
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
                    console.log("AQUI");
                    $state.go("/app/home");
                },
                function (error) {
                    Toast.mostrarErro(error);
                }
            );
        }

        function salvarAlterarUsuario(novoUsuario) {

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
                        $scope.$broadcast('load');
                    },
                    erro => {
                        Toast.mostrarErro(erro);
                    }
                );
            } else {
                Progress.show();
                User.alterarUsuario(
                    novoUsuario
                ).then(
                    () => {
                        Toast.mostrarMensagem("Seus dados foram alterados com sucesso");
                        Usuario.setUsuario(novoUsuario);
                        vm.usuario = novoUsuario;
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
                );
        }

        function _usuarioLogado() {
            let userId = firebase.auth().currentUser.uid;
            User.buscarUsuario(userId).then(function (usuario) {

                    if (usuario == null) {
                        vm.user = user
                        Progress.hide();
                        __abrirModalCadastro();

                    } else {
                        usuario.id = userId;
                        vm.usuario = usuario;
                        $scope.menu.usuario = usuario;
                        Usuario.setUsuario(usuario);
                        $scope.$broadcast('load');
                        Progress.hide();
                    }
                },
                function (error) {
                    Toast.mostrarErro("Erro ao buscar usuário " + JSON.stringify(error));
                })

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







    }

})();


/*
    
      var messaging = firebase.messaging();

      messaging.usePublicVapidKey("BCGwZEs7nsIbkiuJE_gHwxnfBjReLr3RJ0X4Y4XHi5gRFy9JBt_3SvAFBfx7K2Tz5cqEWBMg_zziT98xDh8LtDE");
      messaging.requestPermission().then(function () {
        alert("Pemissao Concedida");
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...

        messaging.getToken().then(function (currentToken) {
          if (currentToken) {
            console.log("TOKEN", currentToken);

          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');

            setTokenSentToServer(false);
          }
        }).catch(function (err) {
          console.log('An error occurred while retrieving token. ', err);

        });
      }).catch(function (err) {
        alert("Pemissao Negada");
      });
      messaging.onMessage(function (payload) {
        console.log('Message received. ', payload);

      });

      messaging.onTokenRefresh(function () {
        messaging.getToken().then(function (refreshedToken) {
          console.log('Token refreshed.');
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          // setTokenSentToServer(false);
          // Send Instance ID token to app server.
          // sendTokenToServer(refreshedToken);
          // ...
        }).catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
          showToken('Unable to retrieve refreshed token ', err);
        });
      });
      */