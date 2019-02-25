(function () {
    'use strict';
    angular.module("app").controller("UsuariosConversaController", UsuariosConversaController);


    UsuariosConversaController.$inject = ["$stateParams", '$state', '$window', "$timeout", "$scope"];

    function UsuariosConversaController($stateParams, $state, $window, $timeout, $scope) {
        var vm = this;

        init();

        vm.iniciarConversa = iniciarConversa;
        vm.goback = goback;

        function iniciarConversa(usuarioConversa) {
            $state.go("app.chat", {
                usuarioConversa: usuarioConversa
            });
        }

        function goback() {
            $window.history.back();
        }

        function init() {
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

            vm.usuariosConversa = new DynamicItems($stateParams.usuariosConversa);
            vm.usuariosConversa.objeto.sort(function (a, b) {
                if (a.nome < b.nome) {
                    return -1;
                } else if (a.nome > b.nome) {
                    return 1;
                }
                return 0;
            });
            console.log("Usuarios Conversa", vm.usuariosConversa);
        }
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