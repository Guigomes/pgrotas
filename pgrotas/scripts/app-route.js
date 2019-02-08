(function () {
  "use strict";


  angular
    .module("app")
    .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
      $mdThemingProvider
        .theme("default")
        .primaryPalette("red")
        .accentPalette("blue");

      $stateProvider
        .state("app", {
          url: "/app",
          name: "app",
          abstract: true,
          cache: false,
          controller: "MenuController",
          controllerAs: "vm",
          templateUrl: "/pages/menu.html"

        })
        .state("app.home", {
          url: "/home",
          name: "home",
          views: {
            viewMapas: {
              controller: "MapasController",
              controllerAs: "vm",
              templateUrl: "/pages/mapas.html"
            },
            viewConversas: {
              controller: "ConversasController",
              controllerAs: "vm",
              templateUrl: "/pages/conversas.html"
            },
            viewGrupo: {
              controller: "GrupoController",
              controllerAs: "vm",
              templateUrl: "/pages/grupo.html"
            }
          }
        }).state("app.listar-usuarios-conversas", {
          url: "/listar-usuarios-conversas",
          name: "listar-usuarios-conversas",
          params: {
            usuariosConversa: null
          },
          views: {
            viewConversas: {
              controller: "UsuariosConversaController",
              controllerAs: "vm",
              templateUrl: "/pages/listar-usuarios-conversa.html"

            }
          }

        }).state("app.chat", {
          url: "/chat",
          name: "chat",
          params: {
            usuarioConversa: null
          },
          views: {
            viewConversas: {
              controller: "ChatController",
              controllerAs: "vm",
              templateUrl: "/pages/chat.html"

            }
          }

        });
      $urlRouterProvider.otherwise("/app/home");
    });

  angular.module("app").run(run);

  function run($window, $rootScope, Authentication) {
    const beforeinstallprompt = function (e) {
      promptEvent = e;
      promptEvent.preventDefault();
      $rootScope.$broadcast("available");

      Authentication.setPromptEvent(promptEvent);
      ga("send", "event", "install", "available");

      return false;
    };

    const installed = function (e) {
      Authentication.setPromptEvent(null);

      // This fires after onbeforinstallprompt OR after manual add to homescreen.
      ga("send", "event", "install", "installed");
    };

    $window.addEventListener("beforeinstallprompt", beforeinstallprompt);
    $window.addEventListener("appinstalled", installed);
  }

})();