(function() {
  "use strict";

  angular.module("app").factory("Usuario", Usuario);

  function Usuario($state) {
    var vm = this;
  vm.grupo = [{nome: '0Hanniball0', codigo: '9375 8507 0415'},{nome: 'Allaster23', codigo: '3745 3560 4779'},{nome: 'AnuarTuma BG', codigo: '8664 1213 3577'},{nome: 'Arcanjo50', codigo: '8656 5389 4138'},{nome: 'Arthurcorreia13', codigo: '5104 8742 2707'},{nome: 'ArtieHyung', codigo: '2168 1516 3666'},{nome: 'Bellerangel', codigo: '4928 2662 1120'},{nome: 'Bgnweb', codigo: '2604 9599 3871 '},{nome: 'Blacksus', codigo: '5419 4302 1733 '},{nome: 'BruLunardi', codigo: '5466 1343 5378 '},{nome: 'CabeloSP', codigo: '8013 2335 7449 '},{nome: 'Caiocamilllo', codigo: '6189 5373 8052'},{nome: 'Cicerorgb', codigo: '2843 3275 7401 '},{nome: 'Cristadama', codigo: '0037 8727 4440 '},{nome: 'Dan7Dan777', codigo: '2051 7156 3583 '},{nome: 'DanteMsH', codigo: '4475 7509 5488 '},{nome: 'Diooooohhh', codigo: '8289 4008 3927 '},{nome: 'DoutrinadorJE', codigo: '7979 5601 2878'},{nome: 'Esqip', codigo: '1949 1407 7775 '},{nome: 'Fantasmaalado', codigo: '0541 2732 3269 '},{nome: 'Fillipe', codigo: '1552 9539 0341 '},{nome: 'Firespheretitan', codigo: '7560 4696 6377 '},{nome: 'Foyao78', codigo: '5041 9324 5166'},{nome: 'gabrielmaximosm', codigo: '2831 5685 0781 '},{nome: 'Gstv', codigo: '8060 2949 2574 '},{nome: 'HelderDMC', codigo: '3163 6834 4047 '},{nome: 'Kadajiy', codigo: '4093 1896 8214 '},{nome: 'Kitute10', codigo: '3185 5441 0740 '},{nome: 'Kooome', codigo: '9421 0012 0167 '},{nome: 'lincolnmonte', codigo: '0637 7421 2069 '},{nome: 'Malandrameinch2', codigo: '5078 5815 7878 '},{nome: 'Marvexx', codigo: '5837 5159 8423 '},{nome: 'MarvinHulkZeXis', codigo: '433300462909 '},{nome: 'MilaRaquel', codigo: '1035 2309 0262 '},{nome: 'Myzunoo', codigo: '5132 1606 0443'},{nome: 'n00z3', codigo: '9914 8422 8060 '},{nome: 'N45t2', codigo: '6565 1588 5619'},{nome: 'Panquecows', codigo: '6506 3028 7645 '},{nome: 'Paskyn', codigo: '0174 4889 8291 '},{nome: 'PauloNori', codigo: '0321 0487 8489'},{nome: 'PedroMbsn', codigo: '9533 0190 6924 '},{nome: 'PirataLamp', codigo: '6945 1815 5701 '},{nome: 'Pocahontasnunes', codigo: '3159 9173 5586 '},{nome: 'Ramenrider', codigo: '6464 2598 5518 '},{nome: 'Sassarai', codigo: '5329 0986 3366'},{nome: 'Supertonhas2', codigo: '9941 3700 1558 '},{nome: 'Thais', codigo: '2579 5977 6188'},{nome: 'Thay1402', codigo: '7593 5827 1952'},{nome: 'TrotonDestroy', codigo: '0992 1313 7362'},{nome: 'Veterazzi', codigo: '7014 5940 8015 '},{nome: 'Vinoguim', codigo: '5534 7976 1482 '},{nome: 'Wheresisa', codigo: '0208 2954 3273 '}];
    vm.Usuario = {};

    function setUsuario(usuario) {
      vm.Ususario = usuario;
    }

    function getUsuario() {
      return vm.Ususario;
    }


     function getGrupo(){
      return vm.grupo;
    }
    return {
      setUsuario: setUsuario,
      getUsuario: getUsuario,
      getGrupo: getGrupo
    };


  


  }
})();
