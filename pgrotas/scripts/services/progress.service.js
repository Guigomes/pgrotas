(function () {
    "use strict";
    angular.module("app").controller("ProgressController", ProgressController);

    angular.module("app").factory("Progress", Progress);


    function Progress($mdDialog) {

        var vm = this;

        vm.isShowing = false;
        return {
            show: show,
            hide: hide
        };

        function show() {
            if (!vm.isShowing) {
                vm.isShowing = true;
                $mdDialog
                    .show({
                        templateUrl: "pages/progress-dialog.html",
                        parent: angular.element(document.body),
                        controller: "ProgressController",
                        controllerAs: "vm",
                    })
                    .then(
                        function () {
                            vm.isShowing = false;

                        },
                        function () {
                            vm.isShowing = false;
                        }
                    );
            }
        }

        function hide() {
            vm.isShowing = false;
            $mdDialog.cancel();
        }
    }

    function ProgressController($timeout, $mdDialog) {
        var vm = this;


    }

})();