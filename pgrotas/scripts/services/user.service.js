(function () {
  "use strict";

  angular.module("app").factory("User", User);

  function User(Usuario) {
    return {
      adicionarUsuario: adicionarUsuario,
      buscarUsuario: buscarUsuario,
      adicionarJogador: adicionarJogador,
      listarJogadores: listarJogadores
    };

    function adicionarJogador(jogador) {
      if (jogador.nivel == undefined || jogador.nivel == null) {
        jogador.nivel = 0;
      }

      if (jogador.time == undefined || jogador.time == null) {
        jogador.time = "";
      }
      return firebase
        .database()
        .ref("jogador").push()
        .set({
          jogador: jogador
        });
    }

    function listarJogadores() {
      return firebase.database().ref('jogador/').once("value").then(function (user) {
        return user.val();
      });
    }

    function adicionarUsuario(novoUsuario) {
      let userId = firebase.auth().currentUser.uid;
      return firebase
        .database()
        .ref("users/" + userId)
        .set({
          nome: novoUsuario.nome,
          codigo: novoUsuario.codigo,
          nivel: novoUsuario.nivel,
          time: novoUsuario.time,
          mensagens: novoUsuario.mensagens,
          grupo: novoUsuario.grupo

        });
    }

    function buscarUsuario(userId) {
      if (userId === undefined) {
        let usuario = Usuario.getUsuario();
        userId = usuario.uid;
      }
      return firebase
        .database()
        .ref("/users/" + userId)
        .once("value")
        .then(function (user) {
          return user.val();
        });
    }
  }
})();