(function() {
  "use strict";

  angular.module("app").factory("Ginasios", Ginasios);

  function Ginasios() {
    return {
      getGinasios: getGinasios
    };

    function compare(a, b) {
      if (a.nome < b.nome) return -1;
      if (a.nome > b.nome) return 1;
      return 0;
    }

    function getGinasios() {
      var ginasios = [
        {
          codigo: 1,
          nome: "Academia dos Vovos",
          lat: "-15.8376886",
          long: "-48.03810184"
        },
        {
          codigo: 2,
          nome: "Bowl*",
          lat: "-15.829585",
          long: "-48.032012"
        },
        {
          codigo: 3,
          nome: "Estação Concessionárias*",
          lat: "-15.834863",
          long: "-48.038892"
        },

        {
          codigo: 4,
          nome: "Skate Park",
          lat: "-15.8360609",
          long: "-48.03909886"
        },
        {
          codigo: 5,
          nome: "Seja Feliz/Bahamas*",
          lat: "-15.837349",
          long: "-48.040981"
        },
        /*
        {
           codigo: 6,
           nome: "*",
           lat: "-15.",
           long: "-48."
        },*/
        {
          codigo: 7,
          nome: "Praça Colibri*",
          lat: "-15.839021",
          long: "-48.035701"
        },
        {
          codigo: 8,
          nome: "Teatro de Águas Claras*",
          lat: "-15.844649",
          long: "-48.034073"
        },
        {
          codigo: 9,
          nome: "Igreja Batista Min. Graça*",
          lat: "-15.843701",
          long: "-48.031267"
        },
        {
          codigo: 10,
          nome: "Estação Águas Claras*",
          lat: "-15.839738",
          long: "-48.028043"
        },
        {
          codigo: 11,
          nome: "Esc. Gavino Reis",
          lat: "-15.83785038",
          long: "-48.480278075"
        },
        {
          codigo: 12,
          nome: "Academia Terceira Idade",
          lat: "-15.83708401",
          long: "-48.03012374"
        },
        {
          codigo: 13,
          nome: "Praça Mont Clair*",
          lat: "-15.843630",
          long: "-48.026516"
        },
        {
          codigo: 14,
          nome: "Parque Infantil -  207*",
          lat: "-15.843923",
          long: "-48.025502"
        },
        {
          codigo: 15,
          nome: "PEC Águas Claras*",
          lat: "-15.836439",
          long: "-48.024832"
        },
        {
          codigo: 16,
          nome: "Marco Quilometragem*",
          lat: "-15.831728",
          long: "-48.026474"
        },
        {
          codigo: 17,
          nome: "Cabeça de Corvo*",
          lat: "-15.829694",
          long: "-48.022756"
        },
        {
          codigo: 18,
          nome: "Brinquedo Parque A.C*",
          lat: "-15.829447",
          long: "-48.020432"
        },
        {
          codigo: 19,
          nome: "Pracinha / 205*",
          lat: "-15.842010",
          long: "-48.021080"
        },
        {
          codigo: 20,
          nome: "Balanço Radical / 204*",
          lat: "-15.841237",
          long: "-48.019317"
        },
        {
          codigo: 21,
          nome: "Mesa Xadrez da Praça Irerê*",
          lat: "-15.838943",
          long: "-48.013895"
        },
        {
          codigo: 22,
          nome: "Cristo Redentor*",
          lat: "-15.842727",
          long: "-48.015660"
        },
        {
          codigo: 23,
          nome: "Burning Flame",
          lat: "-15.83842966",
          long: "-48.02014786"
        },
        {
          codigo: 24,
          nome: "Ame o que faz",
          lat: "-15.83665605",
          long: "-48.02086263"
        },
        {
          codigo: 25,
          nome: "Teatro Céu Aberto",
          lat: "-15.83416518",
          long: "-48.01878544"
        },
        {
          codigo: 26,
          nome: "Ed. Estação XIV",
          lat: "-15.83530841",
          long: "-48.01854996"
        },
        {
          codigo: 27,
          nome: "Estação Arniqueiras",
          lat: "-15.83676028",
          long: "-48.01738179"
        },
        {
          codigo: 28,
          nome: "Menina e os passáros",
          lat: "-15.8353701",
          long: "-48.01673668"
        },
        {
          codigo: 29,
          nome: "Rei Cósmico",
          lat: "-15.83107586",
          long: "-48.01530726"
        },
        {
          codigo: 30,
          nome: "Fonte Vida / Vila Carioca",
          lat: "-15.8292331",
          long: "-48.01438887"
        },
        {
          codigo: 31,
          nome: "Biblioteca de Águas Claras",
          lat: "-15.8341757",
          long: "-48.01282258"
        },
        {
          codigo: 32,
          nome: "Abra as Asas",
          lat: "-15.8356633",
          long: "-48.01272173"
        },
        {
          codigo: 33,
          nome: "Administração Águas Claras",
          lat: "-15.83584381",
          long: "-48.00835717"
        },
        {
          codigo: 34,
          nome: "Igreja Vale Benção*",
          lat: "-15.848380",
          long: "-48.025900"
        },
        {
          codigo: 35,
          nome: "DF Plaza 1*",
          lat: "-15.831353",
          long: "-48.041323"
        },
        {
          codigo: 36,
          nome: "DF Plaza 2*",
          lat: "-15.831401",
          long: "-48.041360"
        },
        {
          codigo: 37,
          nome: "Mundo Estilizado",
          lat: "-15.83269998",
          long: "-48.0383533"
        }
      ];
      ginasios.sort(compare);
      return ginasios;
    }
  }
})();
