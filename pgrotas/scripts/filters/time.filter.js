(function () {
    'use strict';

    angular.module('app').filter("time", time);


    function time() {

        return function (value) {
            if (value == 1) {
                return "Valor";

            } else if (value == 2) {
                return "Mistic";

            } else if (value == 3) {
                return "Instinct";

            }
            return null;
        }
    }


})();