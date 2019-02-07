(function () {
    'use strict';
    angular.module("app").controller("ChatController", ChatController);


    ChatController.$inject = ["$stateParams", 'Chat', '$scope', 'Usuario'];

    function ChatController($stateParams, Chat, $scope, Usuario) {
        var vm = this;

        vm.enviarMensagem = enviarMensagem;

        vm.usuarioConversa = $stateParams.usuarioConversa;

        var idConversa = $stateParams.idConversa;
        listarMensagens();

        function enviarMensagem() {
            let userId = firebase.auth().currentUser.uid;
            var objetoMensagem = {
                remetente: userId,
                destinatario: vm.usuarioConversa.id,
                mensagem: vm.mensagem,
                dataMensagem: new Date(),
                lida: false,
                suaMensagem: true
            };
            vm.mensagens.push(objetoMensagem);
            vm.mensagem = "";

            Chat.enviarMensagem(objetoMensagem).then(function (respostaMensagem) {
                console.log("idConversa", idConversa);
                if (idConversa == undefined) {
                    try {


                        console.log("aqui");
                        var dataUltimaMensagem = objetoMensagem.dataMensagem.toString();

                        var chaveUsuariosMensagem = objetoMensagem.remetente > objetoMensagem.destinatario ? objetoMensagem.remetente + objetoMensagem.destinatario : objetoMensagem.destinatario + objetoMensagem.remetente;


                        var conversa = {
                            chaveUsuariosMensagem: chaveUsuariosMensagem,
                            dataUltimaMensagem: dataUltimaMensagem,
                            user1: objetoMensagem.remetente,
                            nomeUser1: Usuario.getUsuario().nome,
                            user2: objetoMensagem.destinatario,
                            nomeUser2: vm.usuarioConversa.nome,
                            textoUltimaMensagem: objetoMensagem.mensagem
                        };
                        console.log("conversa1", conversa);
                        Chat.cadastrarNovaConversa(conversa);
                    } catch (error) {
                        console.log("error", error);

                    }
                }
            });
        }

        function listarMensagens() {
            Chat.listarMensagens().then(function (mensagens) {

                vm.mensagens = mensagens;
                $scope.$apply();
            });
        }
    }

})();