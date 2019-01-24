angular.module("app").controller("PrincipalController", PrincipalController);

function PrincipalController(
  $mdSidenav,
  Authentication,
  $mdToast,
  $state,
  $rootScope,
  User,
  Ginasios,
  $mdDialog,
  $scope,
  Toast,
  ngClipboard, $log
) {
  var vm = this;


  vm.simulateQuery = false;
  vm.isDisabled = false;

  // list of `state` value/display objects
  vm.querySearch = querySearch;
  vm.selectedItemChange = selectedItemChange;
  vm.searchTextChange = searchTextChange;

  vm.newState = newState;

  function newState(state) {
    alert("Sorry! You'll need to create a Constitution for " + state + " first!");
  }

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
      deferred;
    if (vm.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {}

  function selectedItemChange(item) {
    vm.localSelecionado = vm.locais[item.index];
    vm.codigoLocal = vm.locais[item.index].codigo;
  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {




    return vm.locais.map(function (state) {
      return {
        value: state.nome.toLowerCase(),
        display: state.nome,
        index: vm.locais.indexOf(state)
      };
    });
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = query.toLowerCase();

    return function filterFn(state) {
      if (lowercaseQuery.length > 2) {
        return (state.value.indexOf(lowercaseQuery) != -1);
      }
    };

  }

  listarJogadores();
  vm.adicionarJogador = function () {
    __abrirModalCadastro();
  }

  vm.toggle = toggle;
  vm.go = go;
  vm.sair = sair;


  function listarJogadores() {
    vm.activated = true;
    User.listarJogadores().then((grupo) => {

      vm.grupo = [];

      for (var i in grupo) {
        vm.grupo.push(grupo[i].jogador);
      }


      $scope.$apply();
      vm.activated = false;
    });
  }

  vm.instalar = function () {
    Authentication.instalar();
  };


  /*
    vm.grupo = Usuario.getGrupo();
    for(var i in vm.grupo){
      User.adicionarJogador(vm.grupo[i]);
    }
    */
  init();


  vm.copiar = function (pessoa) {
    ngClipboard.toClipboard(pessoa.codigo, pessoa.nome);

  }

  function init() {
    $rootScope.$on("available", function () {
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
      vm.states = loadAll();

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
        function () {
          $state.go("/");
        },
        function (error) {}
      );
  }

  function __abrirModalCadastro() {
    $mdDialog
      .show({
        controller: DialogController,
        controllerAs: "vm",
        templateUrl: "pages/dialog1.tmpl.html",
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(
        function (novoUsuario) {
          User.adicionarJogador(
            novoUsuario
          ).then(
            () => {
              Toast.mostrarMensagem("Jogador adicionado  com sucesso");
              listarJogadores();
            },
            erro => {
              Toast.mostrarErro(erro);
            }
          );
        },
        function () {
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
                */
    else
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