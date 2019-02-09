(function () {
    'use strict';

    angular.module('app').filter("grupo", grupo);


    function grupo() {

        return function (value) {
            if (value == 1) {
                return "Águas Claras";

            } else if (value == 2) {
                return "Esplanada";

            }
            return null;
        }
    }


})();