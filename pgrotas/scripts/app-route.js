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
        .state("/", {
          url: "/",
          name: "/",
          views: {
            viewContent: {
              controller: "PrincipalController",
              controllerAs: "vm",
              templateUrl: "/pages/principal.html"
            }
          }
        }).state("conversas", {
          url: "/conversas",
          name: "conversas",
          views: {
            viewContent: {
              controller: "ConversasController",
              controllerAs: "vm",
              templateUrl: "/pages/conversas.html"
            }
          }

        });

      $urlRouterProvider.otherwise("/");
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