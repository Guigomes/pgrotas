(function () {
  "use strict";

  angular.module("app").factory("Toast", Toast);

  Toast.$inject = ["$mdToast"];

  function Toast($mdToast) {
    return {
      mostrarErro: mostrarErro,
      mostrarMensagem: mostrarMensagem
    };

    function mostrarErro(mensagemErro) {
      $mdToast.show(
        $mdToast
        .simple()
        .textContent(mensagemErro)
        .position("bottom")
        .hideDelay(2000)
      );
    }

    function mostrarMensagem(mensagem) {
      $mdToast.show(
        $mdToast
        .simple()
        .textContent(mensagem)
        .position("bottom")
        .hideDelay(2000)
      );
    }
  }
})();