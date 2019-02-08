(function () {
  "use strict";

  angular.module("app").factory("Chat", Chat);

  function Chat() {
    return {
      listarConversas: listarConversas,
      listarMensagens: listarMensagens,
      enviarMensagem: enviarMensagem,
      cadastrarNovaConversa: cadastrarNovaConversa
    };

    function enviarMensagem(objetoMensagem) {
      var key = firebase.database().ref().child('mensagens').push().key;


      var mensagem = JSON.parse(JSON.stringify(objetoMensagem));

      mensagem.dataMensagem = objetoMensagem.dataMensagem.toString();
      mensagem.chaveUsuariosMensagem = mensagem.remetente > mensagem.destinatario ? mensagem.remetente + mensagem.destinatario : mensagem.destinatario + mensagem.remetente;
      return firebase
        .database()
        .ref("mensagens/" + key)
        .set(mensagem).then(function () {

          return mensagem;
        });
    }

    function cadastrarNovaConversa(conversa) {

      var key = firebase.database().ref().child('conversas').push().key;

      console.log("conversa", conversa);
      return firebase
        .database()
        .ref("conversas/" + key)
        .set(conversa).then(function () {
          console.log("SAUT");
          return {};
        }, function (error) {
          console.log("ERROR", error);
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
          if (user2.val() != null) {
            response.push(user2.val());
          }

          var minhasConversas = [];
          for (var i in response) {
            console.log("response[i]", response[i]);
            if (response[i] != null) {
              var conversaArray = response[i];
              for (var j in conversaArray) {
                if (conversaArray[j].user1 == userId) {
                  var conversa = {
                    chaveUsuariosMensagem: conversaArray[j].chaveUsuariosMensagem,
                    dataUltimaMensagem: conversaArray[j].dataUltimaMensagem,
                    idAmigo: conversaArray[j].user2,
                    nomeAmigo: conversaArray[j].nomeUser2,
                    textoUltimaMensagem: conversaArray[j].textoUltimaMensagem
                  };

                  console.log("minhaConversa1", conversa);
                  minhasConversas.push(conversa);
                } else {
                  var conversa = {
                    chaveUsuariosMensagem: conversaArray[j].chaveUsuariosMensagem,
                    dataUltimaMensagem: conversaArray[j].dataUltimaMensagem,
                    idAmigo: conversaArray[j].user1,
                    nomeAmigo: conversaArray[j].nomeUser1,
                    textoUltimaMensagem: conversaArray[j].textoUltimaMensagem
                  };
                  console.log("minhaConversa2", conversa);
                  minhasConversas.push(conversa);
                }
              }
            }
          }
          return minhasConversas;

        });
      });
    }

    function listarMensagens(chaveUsuariosMensagem) {
      var response = [];
      return firebase.database().ref('mensagens/').orderByChild("chaveUsuariosMensagem").equalTo(chaveUsuariosMensagem).once("value").then(function (user1) {
        if (user1.val() != null) {
          for (var i in user1.val()) {
            var mensagem = user1.val()[i];
            mensagem.dataMensagem = new Date(mensagem.dataMensagem);
            response.push(mensagem);
          }
          return response;
        }
      });
    }
  }
})();