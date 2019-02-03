(function () {
  "use strict";

  angular.module("app").factory("Authentication", Authentication);

  function Authentication($state, Usuario, User) {
    var vm = this;

    function setPromptEvent(promptEvent) {
      vm.promptEvent = promptEvent;
    }

    function getPromptEvent() {
      return vm.promptEvent;
    }

    function isMostrarInstalar() {
      return vm.isMostrarInstalar;
    }

    function setMostrarInstalar(isMostrarInstalar) {
      vm.isMostrarInstalar = isMostrarInstalar;
    }

    function instalar() {
      let promptEvent = vm.promptEvent;
      if (promptEvent) {
        promptEvent.prompt();
        promptEvent.userChoice
          .then(function (choiceResult) {
            // The user actioned the prompt (good or bad).
            // good is handled in
            promptEvent = null;
            ga("send", "event", "install", choiceResult);
            return true;
          })
          .catch(function (installError) {
            // Boo. update the UI.
            promptEvent = null;
            ga("send", "event", "install", "errored");
            return false;
          });
      }
    }

    function isUsuarioLogado(callback) {
      return firebase.auth().onAuthStateChanged(callback);
    }


    function logout() {
      vm.ui.delete();
      console.log("DELETE");
    }
    return {

      logout: logout,
      setPromptEvent: setPromptEvent,
      getPromptEvent: getPromptEvent,
      instalar: instalar,
      isMostrarInstalar: isMostrarInstalar,
      setMostrarInstalar: setMostrarInstalar,
      isUsuarioLogado: isUsuarioLogado
    };
  }
})();