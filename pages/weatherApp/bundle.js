(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addElements = addElements;
exports.addHistoryElem = addHistoryElem;
exports.createHistoryTable = createHistoryTable;
exports.createModalWindow = createModalWindow;

var _script = require("./script.js");

function addElements(selector, data) {
  var elem = document.querySelector(".".concat(selector));
  var time = data.location.localtime.split('').slice(11, this.lenght).join('');
  addHistoryElem(data, _script.historyArr, time);
  return elem.insertAdjacentHTML('beforeend', "\n        <div class=\"weather\">\n            <div class=\"upper-info\">\n                <div class=\"weather-icon\">\n                    <img src=".concat(data.current.weather_icons[0], " alt=\"Weather icon\">\n                </div>\n                <p class=\"temperature\">").concat(data.current.temperature, "&deg;C</p>\n                <p class=\"current-location\">").concat(data.location.name, ", ").concat(data.location.country, "</p>\n            </div>\n            <div class=\"down-info\">\n                <p class=\"weather-item\">Time: ").concat(time, "</p>\n                <p class=\"weather-item\">Feels like: ").concat(data.current.feelslike, "&deg;C</p>\n                <p class=\"weather-item\">Today is ").concat(data.current.weather_descriptions[0].toLowerCase(), "</p>\n                <p class=\"weather-item\">Wind: ").concat(data.current.wind_dir, "</p>\n                <p class=\"weather-item\">Speed: ").concat(data.current.wind_speed, " km/h</p>\n                <p class=\"weather-item\">Pressure: ").concat(data.current.pressure, " MB</p>\n            </div>\n            <button class=\"btn\" id=\"showHistory\">Show history</button>\n        </div>\n    "));
}

function addHistoryElem(from, to, t) {
  var contain = to.find(function (elem) {
    return elem.name.toLowerCase() == from.location.name.toLowerCase();
  });

  if (!contain) {
    to.push({
      time: t,
      temperature: from.current.temperature,
      name: from.location.name,
      country: from.location.country,
      feelslike: from.current.feelslike,
      description: from.current.weather_descriptions[0],
      wind: from.current.wind_dir,
      pressure: from.current.pressure
    });
    createHistoryTable('history-body', _script.historyArr);
    localStorage.setItem('history', JSON.stringify(to));
  }
}

function createHistoryTable(selector, arr) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : arr.length;
  var elem = document.querySelector(".".concat(selector));
  elem.insertAdjacentHTML('beforeend', "\n        <tr>\n            <td>".concat(index, "</td><td>").concat(arr[index - 1].name, ", ").concat(arr[index - 1].country, "</td><td>").concat(arr[index - 1].time, "</td><td>").concat(arr[index - 1].temperature, "</td><td>").concat(arr[index - 1].feelslike, "</td><td>").concat(arr[index - 1].description, "</td><td>").concat(arr[index - 1].wind, "</td><td>").concat(arr[index - 1].pressure, "</td>\n        </tr>\n    "));
}

function createModalWindow(title, text, btnVal) {
  var errorWindow = document.getElementById('error-window');
  var modal = document.querySelector('.modal');
  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', "\n        <h2>".concat(title, "</h2>\n        <p class=\"text\">").concat(text, "</p>\n        <button class=\"btn\" id=\"contine-btn\">").concat(btnVal, "</button>\n    "));
  var contineBtn = document.getElementById('contine-btn');
  errorWindow.classList.add('active');
  contineBtn.addEventListener('click', function () {
    return errorWindow.classList.remove('active');
  });
}

},{"./script.js":2}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyArr = void 0;

var helper = _interopRequireWildcard(require("./helper.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var form = document.forms.takeLocation;
var title = document.querySelector('.title-block');
var history = document.querySelector('.history');
var hideHistoryBtn = document.getElementById('hideHistory');
var myHistoryBtn = document.getElementById('myHistory');
var locationBtn = document.getElementById('location');
var clearHistoryBtn = document.getElementById('clearHistory');
var loaderElem = document.getElementById('loader');
var historyArr = [];
exports.historyArr = historyArr;

function weatherRequest(way) {
  fetch(way).then(function (response) {
    return response.json();
  }).then(function (resp) {
    helper.addElements('weather-container', resp);
    var loaderElem = document.getElementById('loader');
    var weather = document.querySelector('.weather');
    var showHistoryBtn = document.getElementById('showHistory');
    loaderElem.classList.toggle('hide');
    showHistoryBtn.addEventListener('click', function () {
      history.classList.toggle('hide');
      weather.classList.toggle('hide');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var arr = JSON.parse(localStorage.getItem('history'));

  if (arr && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      var j = i;
      helper.createHistoryTable('history-body', arr, ++j);
    }

    historyArr.push.apply(historyArr, _toConsumableArray(arr));
  }
});
hideHistoryBtn.addEventListener('click', function () {
  var weather = document.querySelector('.weather');
  history.classList.toggle('hide');
  if (weather) weather.classList.toggle('hide');else title.classList.toggle('hide');
});

form.onsubmit = function () {
  var cityInput = document.getElementById('city-input');
  var countryInput = document.getElementById('country-input');
  var query = "".concat(cityInput.value.trim(), ",").concat('' || countryInput.value.trim());
  var weather = document.querySelector('.weather');
  if (!history.classList.contains('hide')) history.classList.add('hide');
  if (weather) weather.remove();

  if (cityInput.value || countryInput.value) {
    loaderElem.classList.toggle('hide');
    title.classList.add('hide');
    weatherRequest("http://api.weatherstack.com/current?access_key=8b0ee8c460893f0f037e36ee1b1434f9&query=".concat(query));
    form.reset();
  } else {
    title.classList.remove('hide');
    helper.createModalWindow('ERROR :(', 'Your inputs are empty. Please, enter your place, or use your current location.', 'Confirm');
  }

  return false;
};

locationBtn.addEventListener('click', function () {
  var weather = document.querySelector('.weather');
  if (weather) weather.remove();
  if (history) history.classList.add('hide');
  loaderElem.classList.toggle('hide');
  title.classList.add('hide');
  navigator.geolocation.getCurrentPosition(function (location) {
    var query = "".concat(location.coords.latitude, ",").concat(location.coords.longitude);
    weatherRequest("http://api.weatherstack.com/current?access_key=8b0ee8c460893f0f037e36ee1b1434f9&query=".concat(query));
  }, function () {
    loaderElem.classList.toggle('hide');
    title.classList.remove('hide');
    helper.createModalWindow('ERROR :(', 'No access to your geolocation.', 'Confirm');
  });
});
myHistoryBtn.addEventListener('click', function () {
  if (historyArr.length > 0) {
    title.classList.toggle('hide');
    history.classList.toggle('hide');
  } else {
    helper.createModalWindow('ERROR :(', 'Sorry, but your history is empty.', 'Confirm');
  }
});
clearHistoryBtn.addEventListener('click', function () {
  var historyBody = document.querySelector('.history-body');
  localStorage.clear();
  historyArr.length = 0;
  historyBody.innerHTML = '';
});

},{"./helper.js":1}]},{},[2]);
