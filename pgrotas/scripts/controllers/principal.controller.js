(function () {
  'use strict';

  angular.module("app").controller("PrincipalController", PrincipalController);

  function PrincipalController(
    $mdSidenav,

    $mdToast,
    $state,
    User,
    Authentication,
    Usuario,
    Ginasios,
    $mdDialog,
    $scope,
    Toast,
    ngClipboard, $log
  ) {
    var vm = this;

    inicializar();

    vm.toggle = toggle;
    vm.go = go;
    vm.sair = sair;
    vm.mostrarMapa = mostrarMapa;
    vm.editarDados = editarDados;

    function inicializar() {
      vm.logado = true;

      // FirebaseUI config.
      return firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {

            let userId = firebase.auth().currentUser.uid;
            return User.buscarUsuario(userId).then(function (usuario) {

                if (usuario == null) {
                  vm.user = user
                  __abrirModalCadastro();

                } else {


                  vm.usuario = usuario;
                  Usuario.setUsuario(usuario);


                  try {

                    vm.locais = vm.usuario.grupo == 1 ? Ginasios.getGinasiosAguasClaras() : Ginasios.getGinasiosEsplanada();
                    vm.title = vm.usuario.grupo == 1 ? "Ginásios de Aguas Claras" : "Ginários da Esplanada";
                    vm.localSelecionado = vm.locais[0];
                    $scope.$apply();
                    vm.states = loadAll();


                  } catch (err) {
                    $mdToast
                      .simple()
                      .textContent(err)
                      .position("bottom")
                      .hideDelay(3000);
                  }
                }
              },
              function (error) {
                console.log("Usuario não encontrado", error);
              })

          } else {
            vm.logado = false;
            var uiConfig = {
              signInSuccessUrl: "/",
              signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
              ],
              // tosUrl and privacyPolicyUrl accept either url string or a callback
              // function.
              // Terms of service url/callback.
              tosUrl: "<your-tos-url>",
              // Privacy policy url/callback.
              privacyPolicyUrl: function () {
                window.location.assign("<your-privacy-policy-url>");
              }
            };
            vm.ui = firebaseui.auth.AuthUI.getInstance();
            if (!vm.ui) {
              // Initialize the FirebaseUI Widget using Firebase.

              vm.ui = new firebaseui.auth.AuthUI(firebase.auth());
            }
            // The start method will wait until the DOM is loaded.
            vm.ui.start("#firebaseui-auth-container", uiConfig);

          }
        },
        function (error) {
          console.log(error);
        }
      );
    }


    vm.adicionarJogador = function () {
      __abrirModalCadastro();
    }




    function mostrarMapa() {

      $mdDialog
        .show({
          templateUrl: "pages/imagem-dialog.html",
          parent: angular.element(document.body),
          controller: "ImagemDialogController",
          controllerAs: "vm",
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(
          function (novoUsuario) {

          },
          function () {
            $scope.status = "You cancelled the dialog.";
          }
        );
    }

    function editarDados() {
      __abrirModalCadastro();

    }

    function listarJogadores() {
      vm.activated = true;
      User.listarJogadores().then((grupo) => {

        vm.grupo = [];

        for (var i in grupo) {
          vm.grupo.push(grupo[i].jogador);
        }

        $scope.$apply();
        vm.activated = false;
      });
    }

    vm.instalar = function () {
      Authentication.instalar();
    };

    vm.trocarGrupo = function () {
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
            if (novoGrupo != vm.usuario.grupo) {
              vm.usuario.grupo = novoGrupo;
              vm.locais = vm.usuario.grupo == 1 ? Ginasios.getGinasiosAguasClaras() : Ginasios.getGinasiosEsplanada();
              vm.title = vm.usuario.grupo == 1 ? "Ginásios de Aguas Claras" : "Ginários da Esplanada";
              vm.localSelecionado = vm.locais[0];

            }
            console.log("RESPOSTA DIALOG");
          },
          function () {
            $scope.status = "You cancelled the dialog.";
          }
        );
    };

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



    vm.copiar = function (pessoa) {
      ngClipboard.toClipboard(pessoa.codigo, pessoa.nome);

    }



    function toggle() {
      $mdSidenav("left").toggle();
    }

    function go() {
      if (vm.codigoLocal !== undefined && vm.codigoLocal > 0) {
        vm.localSelecionado = vm.locais.find(
          item => item.codigo == vm.codigoLocal
        );
      }

      if (vm.localSelecionado !== undefined) {
        __mapsSelector(
          vm.localSelecionado.lat,
          vm.localSelecionado.long,
          vm.localSelecionado.nome
        );
      } else {
        $mdToast.show(
          $mdToast
          .simple()
          .textContent(
            "Não foi encontrado um ginásio com o código " + vm.codigoLocal
          )
          .position("bottom")
          .hideDelay(3000)
        );
      }
    }

    function sair() {
      firebase
        .auth()
        .signOut()
        .then(
          function () {
            $state.go("/");
          },
          function (error) {}
        );
    }

    function __abrirModalCadastro() {
      $mdDialog
        .show({
          controller: CadastroDialogController,
          controllerAs: "vm",
          templateUrl: "pages/dialog1.tmpl.html",
          parent: angular.element(document.body),
          clickOutsideToClose: false,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(
          function (novoUsuario) {
            novoUsuario.email = vm.user.email;
            User.adicionarUsuario(
              novoUsuario
            ).then(
              () => {
                Toast.mostrarMensagem("Seja bem vindo " + novoUsuario.nome);
                listarJogadores();
              },
              erro => {
                Toast.mostrarErro(erro);
              }
            );
          },
          function () {
            $scope.status = "You cancelled the dialog.";
          }
        );
    }

    function __mapsSelector(lat, long, nome) {
      if (
        /* if we're on iOS, open in Apple Maps */
        navigator.platform.indexOf("iPhone") != -1 ||
        navigator.platform.indexOf("iPod") != -1 ||
        navigator.platform.indexOf("iPad") != -1
      )
        window.open(
          "maps://maps.google.com/maps?daddr=" + lat + ", + " + long + "&amp;ll="
        );
      /* else use Google */
      /*
                  window.open(
                    "https://maps.google.com/maps?daddr=" +
                      lat +
                      ", + " +
                      long +
                      "&amp;ll="
                  );
                  */
      else
        window.open(
          "https://maps.google.com/maps?q=" +
          lat +
          ", + " +
          long +
          "(" +
          nome +
          ")&amp;ll="
        );
    }



  }

})();