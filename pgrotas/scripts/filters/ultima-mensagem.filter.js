(function () {
    'use strict';

    angular.module('app').filter("ultimaMensagem", ultimaMensagem);


    function ultimaMensagem() {

        return function (value) {
            if (value == undefined || value == null || value.length == 0)
                return "";

            if (value.length > 100) {
                return value.substring(0, 100) + "...";
            }
            return value;
        }
    }


})();