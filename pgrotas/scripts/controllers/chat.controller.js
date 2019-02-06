(function () {
    'use strict';
    angular.module("app").controller("ChatController", ChatController);


    ChatController.$inject = ["$stateParams", 'Chat', '$scope'];

    function ChatController($stateParams, Chat, $scope) {
        var vm = this;

        vm.enviarMensagem = enviarMensagem;

        vm.usuarioConversa = $stateParams.usuarioConversa;

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