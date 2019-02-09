(function () {
    'use strict';
    angular.module("app").controller("ChatController", ChatController);


    ChatController.$inject = ["$stateParams", 'Chat', '$scope', 'Usuario', 'Conversa', 'Toast'];

    function ChatController($stateParams, Chat, $scope, Usuario, Conversa, Toast) {
        var vm = this;

        vm.enviarMensagem = enviarMensagem;

        vm.usuarioConversa = $stateParams.usuarioConversa;

        var conversa = Conversa.getConversa();
        vm.usuario = Usuario.getUsuario();

        console.log("conversa", conversa);
        console.log(" vm.usuarioConversa", vm.usuarioConversa);
        var idAmigo = conversa !== null ? conversa.idAmigo : vm.usuarioConversa.id;
        vm.nomeAmigo = conversa !== null ? conversa.nomeAmigo : vm.usuarioConversa.nome;

        console.log("nomeAmigo", vm.nomeAmigo);
        if (conversa != undefined && conversa != null) {
            listarMensagens(conversa.chaveUsuariosMensagem);
        } else {
            var chaveUsuariosMensagem = vm.usuario.id > vm.usuarioConversa.id ? vm.usuario.id + vm.usuarioConversa.id : vm.usuarioConversa.id + vm.usuario.id;
            listarMensagens(chaveUsuariosMensagem);
        }

        function enviarMensagem() {
            let userId = firebase.auth().currentUser.uid;
            var objetoMensagem = {
                remetente: userId,
                destinatario: idAmigo,
                mensagem: vm.mensagem,
                dataMensagem: new Date(),
                lida: false,
                suaMensagem: true
            };
            vm.mensagens.push(objetoMensagem);
            vm.mensagem = "";

            Chat.enviarMensagem(objetoMensagem).then(function (respostaMensagem) {
                if (conversa == undefined) {
                    try {

                        var dataUltimaMensagem = objetoMensagem.dataMensagem.toString();
                        var chaveUsuariosMensagem = objetoMensagem.remetente > objetoMensagem.destinatario ? objetoMensagem.remetente + objetoMensagem.destinatario : objetoMensagem.destinatario + objetoMensagem.remetente;

                        var conversa = {
                            chaveUsuariosMensagem: chaveUsuariosMensagem,
                            dataUltimaMensagem: dataUltimaMensagem,
                            user1: objetoMensagem.remetente,
                            nomeUser1: Usuario.getUsuario().nome,
                            user2: objetoMensagem.destinatario,
                            nomeUser2: vm.nomeAmigo,
                            textoUltimaMensagem: objetoMensagem.mensagem
                        };
                        console.log("novaConversa", conversa);
                        Chat.cadastrarNovaConversa(conversa);
                    } catch (error) {
                        Toast.mostrarErro(error);
                    }
                }
            });
        }

        function listarMensagens(chaveUsuariosMensagem) {
            vm.mensagens = [];
            if (chaveUsuariosMensagem !== undefined && chaveUsuariosMensagem !== null) {
                Chat.listarMensagens(chaveUsuariosMensagem).then(function (mensagens) {
                    vm.mensagens = mensagens;
                    $scope.$apply();
                });
            }
        }
    }

})();