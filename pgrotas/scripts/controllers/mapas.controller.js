(function () {
  'use strict';

  angular.module("app").controller("MapasController", MapasController);

  MapasController.$inject = ['Usuario', 'Ginasios', '$mdDialog', '$scope', 'Cache'];

  function MapasController(Usuario, Ginasios, $mdDialog, $scope, Cache) {
    var vm = this;

    vm.go = go;
    vm.mostrarMapa = mostrarMapa;


    $scope.$on('load', function (e) {
      vm.usuario = Usuario.getUsuario();
      initMapas();
    });

    initCache();

    function initMapas() {
      vm.locais = vm.usuario.grupo == 1 ? Ginasios.getGinasiosAguasClaras() : Ginasios.getGinasiosEsplanada();
      Cache.setGinasios(vm.locais);
      vm.localSelecionado = vm.locais[0];

    }

    function initCache() {
      if (Cache.getGinasios() != undefined) {
        vm.locais = Cache.getGinasios();
        vm.localSelecionado = vm.locais[0];
      }
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