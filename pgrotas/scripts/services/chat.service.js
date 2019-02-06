(function () {
  "use strict";

  angular.module("app").factory("Chat", Chat);

  function Chat() {
    return {
      listarConversas: listarConversas,
      listarMensagens: listarMensagens,
      enviarMensagem: enviarMensagem
    };

    function enviarMensagem(objetoMensagem) {
      var key = firebase.database().ref().child('mensagens').push().key;


      var mensagem = JSON.parse(JSON.stringify(objetoMensagem));

      mensagem.dataMensagem = objetoMensagem.dataMensagem.toString();

      return firebase
        .database()
        .ref("mensagens/" + key)
        .set(mensagem).then(function () {

          return mensagem;
        });
    }

    function listarConversas() {
      let userId = firebase.auth().currentUser.uid;
      var response = [];
      return firebase.database().ref('conversas/').orderByChild("user1").equalTo(userId.toString()).once("value").then(function (user1) {
        if (user1.val() != null) {
          response.push(user1.val());
        }
        return firebase.database().ref('conversas/').orderByChild("user2").equalTo(userId.toString()).once("value").then(function (user2) {
          if (user1.val() != null) {
            response.push(user2.val());
          }
          return response;

        });
      });
    }

    function listarMensagens() {
      let userId = firebase.auth().currentUser.uid;
      var response = [];
      return firebase.database().ref('mensagens/').orderByChild("remetente").equalTo(userId.toString()).once("value").then(function (user1) {
        if (user1.val() != null) {
          for (var i in user1.val()) {
            var mensagem = user1.val()[i];
            mensagem.suaMensagem = true;
            mensagem.dataMensagem = new Date(mensagem.dataMensagem);
            response.push(mensagem);
          }
          console.log("user1", response);


        }
        return firebase.database().ref('mensagens/').orderByChild("destinatario").equalTo(userId.toString()).once("value").then(function (user2) {
          if (user2.val() != null) {
            for (var i in user2.val()) {
              var mensagem = user2.val()[i];
              mensagem.suaMensagem = false;
              mensagem.dataMensagem = new Date(mensagem.dataMensagem);

              response.push(mensagem);
            }

          }
          return response;

        });
      });
    }

  }
})();