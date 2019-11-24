import * as helper from './helper.js';
export { historyArr };
const form = document.forms.takeLocation;
const title = document.querySelector('.title-block');
const history = document.querySelector('.history');
const hideHistoryBtn = document.getElementById('hideHistory');
const myHistoryBtn = document.getElementById('myHistory');
const locationBtn = document.getElementById('location');
const clearHistoryBtn = document.getElementById('clearHistory');
const loaderElem = document.getElementById('loader');
const historyArr = [];

function weatherRequest(way) {
  fetch(way).then((response) => response.json()).then((resp) => {
    helper.addElements('weather-container', resp);

    const loaderElem = document.getElementById('loader');
    const weather = document.querySelector('.weather');
    const showHistoryBtn = document.getElementById('showHistory');

    loaderElem.classList.toggle('hide');

    showHistoryBtn.addEventListener('click', () => {
      history.classList.toggle('hide');
      weather.classList.toggle('hide');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const arr = JSON.parse(localStorage.getItem('history'));

  if (arr && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      let j = i;
      helper.createHistoryTable('history-body', arr, ++j);
    }

    historyArr.push(...arr);
  }
});

hideHistoryBtn.addEventListener('click', () => {
  const weather = document.querySelector('.weather');

  history.classList.toggle('hide');
  if (weather) weather.classList.toggle('hide');
  else title.classList.toggle('hide');

});

form.onsubmit = () => {
  const cityInput = document.getElementById('city-input');
  const countryInput = document.getElementById('country-input');
  const query = `${cityInput.value.trim()},${'' || countryInput.value.trim()}`;
  const weather = document.querySelector('.weather');

  if (!history.classList.contains('hide')) history.classList.add('hide');
  if (weather) weather.remove();
  if (cityInput.value || countryInput.value) {
    loaderElem.classList.toggle('hide');
    title.classList.add('hide');
    weatherRequest(`http://api.weatherstack.com/current?access_key=8b0ee8c460893f0f037e36ee1b1434f9&query=${query}`);
    form.reset();

  } else {
    title.classList.remove('hide');
    helper.createModalWindow('ERROR :(', 'Your inputs are empty. Please, enter your place, or use your current location.', 'Confirm');
  }

  return false;
};

locationBtn.addEventListener('click', () => {
  const weather = document.querySelector('.weather');

  if (weather) weather.remove();
  if (history) history.classList.add('hide');

  loaderElem.classList.toggle('hide');
  title.classList.add('hide');

  navigator.geolocation.getCurrentPosition((location) => {
    const query = `${location.coords.latitude},${location.coords.longitude}`;
    weatherRequest(`http://api.weatherstack.com/current?access_key=8b0ee8c460893f0f037e36ee1b1434f9&query=${query}`)
  }, () => {
    loaderElem.classList.toggle('hide');
    title.classList.remove('hide');
    helper.createModalWindow('ERROR :(', 'No access to your geolocation.', 'Confirm')
  });
});

myHistoryBtn.addEventListener('click', () => {
  if (historyArr.length > 0) {
    title.classList.toggle('hide');
    history.classList.toggle('hide');

  } else {
    helper.createModalWindow('ERROR :(', 'Sorry, but your history is empty.', 'Confirm');
  }
});

clearHistoryBtn.addEventListener('click', () => {
  const historyBody = document.querySelector('.history-body');

  localStorage.clear();
  historyArr.length = 0;
  historyBody.innerHTML = '';
});
