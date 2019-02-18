(function () {
    'use strict';

    angular.module("app").controller("GrupoController", GrupoController);

    GrupoController.$inject = ["$scope", "Usuario", "User", "ngClipboard", "$window", '$timeout', 'Cache', 'Progress'];

    function GrupoController($scope, Usuario, User, ngClipboard, $window, $timeout, Cache, Progress) {
        var vm = this;
        vm.copiarCodigoJogador = copiarCodigoJogador;
        vm.pesquisar = pesquisar;

        $scope.$on('load', function (e) {
            vm.usuario = Usuario.getUsuario();
            carregarGrupo();

        });
        initCache();

        function initCache() {
            if (Cache.getUsuarios() !== undefined) {
                vm.usuarios = Cache.getUsuarios();
            }
        }

        function carregarGrupo() {

            $scope.menu.title = vm.usuario.grupo == 1 ? "Ginásios de Aguas Claras" : "Ginásios da Esplanada";
            listarJogadores();
        }

        function pesquisar() {
            var temp = [];

            for (var i in vm.usuariosTemp) {
                if (vm.usuariosTemp[i].nome.toLowerCase().indexOf(vm.pesquisa.toLowerCase()) != -1) {
                    temp.push(vm.usuariosTemp[i]);
                }
                i
            }

            vm.usuarios = new DynamicItems(temp);


        }

        function copiarCodigoJogador(jogador) {
            ngClipboard.toClipboard(jogador.codigo, jogador.nome);
        }

        function listarJogadores() {
            if (vm.usuario.grupo == 1) {
                User.listarJogadores().then((grupo) => {

                    vm.grupoTemp = [];

                    for (var i in grupo) {
                        vm.grupoTemp.push(grupo[i].jogador);
                    }

                    User.listarUsuarios(vm.usuario.grupo).then(function (usuarios) {
                        vm.usuariosTemp = [];

                        for (var i in usuarios) {
                            if (usuarios[i].codigo !== undefined && usuarios[i].codigo.trim().length > 0) {
                                vm.usuariosTemp.push(usuarios[i]);
                            }
                        }
                        vm.usuariosTemp = vm.usuariosTemp.concat(vm.grupoTemp);
                        vm.usuariosTemp.sort(function (a, b) {
                            if (a.nome < b.nome) {
                                return -1;
                            } else if (a.nome > b.nome) {
                                return 1;
                            }
                            return 0;
                        });
                        vm.usuarios = new DynamicItems(vm.usuariosTemp);
                        Cache.setUsuarios(vm.usuarios);
                        Progress.hide();
                    });

                });
            } else {
                User.listarUsuarios(vm.usuario.grupo).then(function (usuarios) {
                    vm.usuarios = [];
                    vm.grupo = [];
                    vm.usuariosTemp = [];
                    for (var i in usuarios) {
                        vm.usuariosTemp.push(usuarios[i]);
                    }
                    vm.usuariosTemp.sort(function (a, b) {
                        if (a.nome < b.nome) {
                            return -1;
                        } else if (a.nome > b.nome) {
                            return 1;
                        }
                        return 0;
                    });
                    vm.usuarios = new DynamicItems(vm.usuariosTemp);
                    Cache.setUsuarios(vm.usuarios);
                    Progress.hide();
                });

            }
        }

        var DynamicItems = function (objeto) {

            this.objeto = objeto
            /**
             * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
             */
            this.loadedPages = {};

            /** @type {number} Total number of items. */
            this.numItems = 0;

            /** @const {number} Number of items to fetch per request. */
            this.PAGE_SIZE = 20;

            this.fetchNumItems_();
        };

        // Required.
        DynamicItems.prototype.getItemAtIndex = function (index) {
            var pageNumber = Math.floor(index / this.PAGE_SIZE);
            var page = this.loadedPages[pageNumber];

            if (page) {
                return page[index % this.PAGE_SIZE];
            } else if (page !== null) {
                this.fetchPage_(pageNumber);
            }
        };

        // Required.
        DynamicItems.prototype.getLength = function () {
            return this.numItems;
        };

        DynamicItems.prototype.fetchPage_ = function (pageNumber) {
            // Set the page to null so we know it is already being fetched.
            this.loadedPages[pageNumber] = null;

            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.
            $timeout(angular.noop, 300).then(angular.bind(this, function () {
                this.loadedPages[pageNumber] = [];
                var pageOffset = pageNumber * this.PAGE_SIZE;
                for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
                    this.loadedPages[pageNumber].push(this.objeto[i]);
                }
            }));
        };

        DynamicItems.prototype.fetchNumItems_ = function () {
            // For demo purposes, we simulate loading the item count with a timed
            // promise. In real code, this function would likely contain an
            // $http request.
            $timeout(angular.noop, 300).then(angular.bind(this, function () {
                this.numItems = this.objeto.length;
            }));
        };




        vm.getListHeight = function () {
            return {
                height: '' + ($window.innerHeight - 72) + 'px'
            };
        };
        $window.addEventListener('resize', onResize);

        function onResize() {
            $scope.$digest();
        }
        $scope.$on('$destroy', function () {
            $window.removeEventListener('resize', onResize);
        });

    }

})();