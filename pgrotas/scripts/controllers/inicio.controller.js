angular.module("app").controller("InicioController", InicioController);
angular.module("app").controller("DialogController", DialogController);

function InicioController(Authentication, $rootScope, $scope) {
  var vm = this;
  vm.mostrarInstalar = false;

  $rootScope.$on("available", function() {
    vm.mostrarInstalar = true;
    $rootScope.$apply();
  });
  Authentication.inicializar();
  vm.instalar = function() {
    Authentication.instalar();
  };
}

function DialogController($scope, $mdDialog, $mdToast) {
  var vm = this;
  $scope.hide = function() {
    $mdDialog.hide();
  };

  vm.times = [
    {
      codigo: 1,
      nome: "Valor"
    },
    {
      codigo: 2,
      nome: "Mistic"
    },
    {
      codigo: 3,
      nome: "Instinto"
    }
  ];
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  vm.answer = function(form) {
    if (!form.$valid) {
      $mdToast.show(
        $mdToast
          .simple()
          .textContent("Por favor, informe todos os campos obrigatórios.")
          .position("bottom")
          .hideDelay(3000)
      );
    } else {
      if (vm.nivel === undefined  || vm.nivel === "" || (vm.nivel > 0 && vm.nivel <= 40)) {
        let novoUsuario = {
          codigo: vm.codigo,
          nome: vm.apelido,
          nivel: vm.nivel,
          time: vm.time
        };
        $mdDialog.hide(novoUsuario);
      } else {
        $mdToast.show(
          $mdToast
            .simple()
            .textContent("Por favor, informe um nivel entre 1 e 40.")
            .position("bottom")
            .hideDelay(3000)
        );
      }
    }
  };
}
