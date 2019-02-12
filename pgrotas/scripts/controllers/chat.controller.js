(function () {
    'use strict';
    angular.module("app").controller("ChatController", ChatController);


    ChatController.$inject = ["$stateParams", 'Chat', '$scope', 'Usuario', 'Cache', 'Toast', '$timeout', '$location', '$window'];

    function ChatController($stateParams, Chat, $scope, Usuario, Cache, Toast, $timeout, $location, $window) {
        var vm = this;

        vm.enviarMensagem = enviarMensagem;

        vm.usuarioConversa = $stateParams.usuarioConversa;
        vm.goback = goback;
        vm.conversaAtual = Cache.getConversaAtual();
        vm.usuario = Usuario.getUsuario();

        var body = angular.element(document.querySelector('body'));


        var scrollHeight = body.prop('scrollHeight');

        vm.style = {
            "max-height": scrollHeight - 200 + "px"
        };

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

        $timeout(function () {

            if (vm.conversaAtual != undefined && vm.conversaAtual != null) {
                listarMensagens(vm.conversaAtual.chaveUsuariosMensagem);
            } else {
                var chaveUsuariosMensagem = vm.usuario.id > vm.usuarioConversa.id ? vm.usuario.id + vm.usuarioConversa.id : vm.usuarioConversa.id + vm.usuario.id;
                listarMensagens(chaveUsuariosMensagem);
            }
        }, 10000);

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
            scroll(1000);
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

        function scroll(timeAnimation) {
            try {
                $timeout(function () {
                    var list = angular.element(document.querySelector('#chat-content'));
                    var scrollHeight = list.prop('scrollHeight');
                    list.animate({
                        scrollTop: scrollHeight
                    }, timeAnimation);
                }, 100)

            } catch (err) {
                alert(err);
            }

        }

        function listarMensagens(chaveUsuariosMensagem) {
            vm.mensagens = [];
            if (chaveUsuariosMensagem !== undefined && chaveUsuariosMensagem !== null) {
                Chat.listarMensagens(chaveUsuariosMensagem).then(function (mensagens) {
                    if (mensagens != undefined && mensagens.length > 0) {

                        mensagens.sort(compare);
                        vm.mensagens = mensagens;
                        scroll(0);
                        //   $location.hash('bottom');
                        //  $anchorScroll();
                    }

                    $scope.$apply();
                });
            }

            function compare(a, b) {
                if (a.dataMensagem < b.dataMensagem)
                    return -1;
                if (a.dataMensagem > b.dataMensagem)
                    return 1;
                return 0;
            }
        }
    }

})();