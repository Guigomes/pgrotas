(function () {
    'use strict';
    angular.module("app").controller("ChatController", ChatController);


    ChatController.$inject = ["$stateParams", 'Chat', '$scope', 'Usuario', 'Cache', 'Toast', '$anchorScroll', '$location', '$window'];

    function ChatController($stateParams, Chat, $scope, Usuario, Cache, Toast, $anchorScroll, $location, $window) {
        var vm = this;

        vm.enviarMensagem = enviarMensagem;

        vm.usuarioConversa = $stateParams.usuarioConversa;
        vm.goback = goback;
        vm.conversaAtual = Cache.getConversaAtual();
        vm.usuario = Usuario.getUsuario();

        function goback() {
            $window.history.back();
        }

        var idAmigo = vm.conversaAtual !== undefined ? vm.conversaAtual.idAmigo : vm.usuarioConversa.id;
        vm.nomeAmigo = vm.conversaAtual !== undefined ? vm.conversaAtual.nomeAmigo : vm.usuarioConversa.nome;

        if (vm.conversaAtual != undefined && vm.conversaAtual != null) {
            listarMensagens(vm.conversaAtual.chaveUsuariosMensagem);
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
                    if (vm.conversaAtual == undefined) {
                        Chat.cadastrarNovaConversa(conversa);
                    } else {
                        Chat.atualizarConversa(conversa, vm.conversaAtual.id);
                    }


                } catch (error) {
                    Toast.mostrarErro(error);
                }

            });
        }
        vm.scroll = function () {
            //    $location.hash('end');

            //  $anchorScroll();
        }

        function listarMensagens(chaveUsuariosMensagem) {
            vm.mensagens = [];
            if (chaveUsuariosMensagem !== undefined && chaveUsuariosMensagem !== null) {
                Chat.listarMensagens(chaveUsuariosMensagem).then(function (mensagens) {
                    if (mensagens != undefined && mensagens.length > 0) {

                        vm.mensagens = mensagens;
                        //   $location.hash('bottom');
                        //  $anchorScroll();
                    }

                    $scope.$apply();
                });
            }
        }
    }

})();