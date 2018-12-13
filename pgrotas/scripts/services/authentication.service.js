(function() {
  "use strict";

  angular.module("app").factory("Authentication", Authentication);

  function Authentication($state, Usuario) {
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
          .then(function(choiceResult) {
            // The user actioned the prompt (good or bad).
            // good is handled in
            promptEvent = null;
            ga("send", "event", "install", choiceResult);
            return true;
          })
          .catch(function(installError) {
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
    function inicializar(telaLogado) {
      // FirebaseUI config.
      firebase.auth().onAuthStateChanged(
        function(user) {
          if (user) {
            // User is signed in.

            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;

            user.getIdToken().then(function(accessToken) {
              Usuario.setUsuario(user);
              if (telaLogado === undefined) {
                $state.go("logado");
              }
            });
          } else {
            var uiConfig = {
              signInSuccessUrl: "/#!/logado",
              signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
              ],
              // tosUrl and privacyPolicyUrl accept either url string or a callback
              // function.
              // Terms of service url/callback.
              tosUrl: "<your-tos-url>",
              // Privacy policy url/callback.
              privacyPolicyUrl: function() {
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
        function(error) {
          console.log(error);
        }
      );
    }

    function logout() {
      vm.ui.delete();
      console.log("DELETE");
    }
    return {
      inicializar: inicializar,
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
