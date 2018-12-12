angular.module("app").controller("PrincipalController", PrincipalController);

function PrincipalController(
  $mdSidenav,
  Usuario,
  Authentication,
  $mdToast,
  $state,
  $rootScope,
  User,
  Ginasios,
  $mdDialog,
  $scope,
  Toast,
  ngClipboard
) {
  var vm = this;
  vm.adicionarJogador = function(){
         __abrirModalCadastro();
  }
  
  vm.toggle = toggle;
  vm.go = go;
  vm.sair = sair;



  vm.instalar = function() {
    Authentication.instalar();
  };

  vm.grupo = Usuario.getGrupo();
    init();
  console.log("grupo", vm.grupo);
vm.copiar = function(pessoa){
  ngClipboard.toClipboard(pessoa.codigo, pessoa.nome);

}
  function init() {
    $rootScope.$on("available", function() {
      vm.mostrarInstalar = true;
      $rootScope.$apply();
    });
    /*
    vm.usuario = Usuario.getUsuario();
*/
    vm.mostrarInstalar = false;
    /*
    User.buscarUsuario().then(user => {
      if (user == null) {
        __abrirModalCadastro();
      }

      vm.usuario = user;
    });
*/
    try {
      vm.locais = Ginasios.getGinasios();
      vm.localSelecionado = vm.locais[0];
    } catch (err) {
      $mdToast
        .simple()
        .textContent(err)
        .position("bottom")
        .hideDelay(3000);
    }
  }

  function toggle() {
    $mdSidenav("left").toggle();
  }

  function go() {
    if (vm.codigoLocal !== undefined && vm.codigoLocal > 0) {
      vm.localSelecionado = vm.locais.find(
        item => item.codigo == vm.codigoLocal
      );
    }

    if (vm.localSelecionado !== undefined) {
      __mapsSelector(
        vm.localSelecionado.lat,
        vm.localSelecionado.long,
        vm.localSelecionado.nome
      );
    } else {
      $mdToast.show(
        $mdToast
          .simple()
          .textContent(
            "Não foi encontrado um ginásio com o código " + vm.codigoLocal
          )
          .position("bottom")
          .hideDelay(3000)
      );
    }
  }

  function sair() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          $state.go("/");
          console.log("logout");
        },
        function(error) {
          console.log("logout error");
        }
      );
  }

  function __abrirModalCadastro() {
    $mdDialog
      .show({
        controller: DialogController,
        controllerAs: "vm",
        templateUrl: "pages/dialog1.tmpl.html",
        parent: angular.element(document.body),
        //  clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(
        function(novoUsuario) {
          User.adicionarUsuario(
            novoUsuario.nome,
            novoUsuario.codigo,            
          ).then(
            () => {
              Toast.mostrarMensagem("Jogador adicionado  com sucesso");
            },
            erro => {
              Toast.mostrarErro(erro);
            }
          );
          console.log("novoUsuario", novoUsuario);
        },
        function() {
          $scope.status = "You cancelled the dialog.";
        }
      );
  }

  function __mapsSelector(lat, long, nome) {
    if (
      /* if we're on iOS, open in Apple Maps */
      navigator.platform.indexOf("iPhone") != -1 ||
      navigator.platform.indexOf("iPod") != -1 ||
      navigator.platform.indexOf("iPad") != -1
    )
      window.open(
        "maps://maps.google.com/maps?daddr=" + lat + ", + " + long + "&amp;ll="
      );
    /* else use Google */
    /*
                window.open(
                  "https://maps.google.com/maps?daddr=" +
                    lat +
                    ", + " +
                    long +
                    "&amp;ll="
                );
                */ else
      window.open(
        "https://maps.google.com/maps?q=" +
          lat +
          ", + " +
          long +
          "(" +
          nome +
          ")&amp;ll="
      );
  }
}
