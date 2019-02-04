(function () {
    'use strict';
    angular.module("app").controller("ConversasController", ConversasController);


    ConversasController.$inject = ['Chat', 'User', '$scope'];

    function ConversasController(Chat, User, $scope) {
        var vm = this;

        vm.listarUsuariosConversa = listarUsuariosConversa;
        Chat.listarConversas().then(function(response){
            vm.conversas = response;
            console.log("conversas", vm.conversas);
            $scope.$apply();
        }, function(erro){
console.log("ERRO", erro);
        });


        function listarUsuariosConversa(){
            User.listarUsuariosConversa(function(usuariosConversa){
                vm.usuariosConversa = []
                for (var i in usuariosConversa) {
                    vm.usuariosConversa.push(usuariosConversa[i]);
                  }
                    console.log("Usiarios Conversao", vm.usuariosConversa);
            })
        }

    }

})();