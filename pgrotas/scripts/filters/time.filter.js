(function () {
    'use strict';

    angular.module('app').filter("time", time);


    function time() {

        return function (value) {
            console.log("Time", value);
            if (value == 1) {
                return "Valor";

            } else if (value == 2) {
                return "Mistico";

            } else if (value == 3) {
                console.log("AQUI");
                return "Instinto";

            }
            return null;
        }
    }


})();