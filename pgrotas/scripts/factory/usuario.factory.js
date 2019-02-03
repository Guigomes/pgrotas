(function () {
  "use strict";

  angular.module("app").factory("Usuario", Usuario);

  function Usuario($state) {
    var vm = this;

    vm.Usuario = {};

    function setUsuario(usuario) {
      vm.Ususario = usuario;
    }

    function getUsuario() {
      return vm.Ususario;
    }


    function getGrupo() {
      return vm.grupo;
    }
    return {
      setUsuario: setUsuario,
      getUsuario: getUsuario,
      getGrupo: getGrupo
    };





  }
})();