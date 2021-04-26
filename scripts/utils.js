const QUOTES = [
  "Se tiene que cortar 17 árboles para producir una tonelada de papel",
  "Por cada litro de tequila, se contaminan 10 litros de agua",
  "La mitad del plástico se ha fabricado desde el año 2000",
  "Una pila alcalina contamina 167 mil litros de agua",
  "Aproximadamente el 75% del agua consumida de una de casa proviene del baño",
  "Reciclar 1Ton de cartón = Evitar que 8Mts de tierra se utilicen como relleno sanitario",
  "Podríamos utilizar 1 TV por 3hrs al reciclar una lata de aluminio",
  "Podríamos encender un foco de 60W al reciclar una  botella de plástico",
  "No cargar el celular por 1 día = Evitar 15M de Kg de gases invernadero",
  "Reciclar 515 celulares = Energía suficiente para una casa por 1 año",
  "Se utiliza aprox. el 9% de la producción de petroleo  para fabricar plástico",
  "El 5% de la población utiliza  el 25% de la energía del mundo",
  "Desperdiciar una gota por segundo es equivalente a 30 litros  de agua diarios",
  "Durante los últimos 35 años, se ha perdido  1/3 de la vida silvestre global",
];

const Utils = {};

Utils.searchParams = function (searchParams) {
  return searchParams
    .substring(1)
    .split("&")
    .reduce(function (result, value) {
      var parts = value.split("=");
      if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      return result;
    }, {});
};

Utils.randomNumber = function (mn, mx) {
  return Math.floor(Math.random() * (mx - mn) + mn) - 1;
};

Utils.getMonthsBetween = function (start, end) {
  var timeDiff = Math.abs(end.getTime() - start.getTime());
  return Math.round(timeDiff / (2e3 * 3600 * 365.25));
};

Utils.getDaysBetween = function (date1, date2) {
  var ONEDAY = 1000 * 60 * 60 * 24;
  var date1_ms = new Date(date1).getTime();
  var date2_ms = new Date(date2).getTime();
  var difference_ms = Math.abs(date1_ms - date2_ms);
  var res = Math.round(difference_ms / ONEDAY);

  return res > 1 ? "By Days" : "By Minutes";
};
