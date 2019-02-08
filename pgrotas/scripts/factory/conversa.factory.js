(function () {
  "use strict";

  angular.module("app").factory("Conversa", Conversa);

  function Conversa() {
    var vm = this;

    vm.conversa = null;

    function setConversa(conversa) {
      vm.conversa = conversa;
    }

    function getConversa() {
      return vm.conversa;
    }


    return {
      setConversa: setConversa,
      getConversa: getConversa
    };





  }
})();