import { historyArr } from './script.js';

export function addElements(selector, data) {
  const elem = document.querySelector(`.${selector}`);
  const time = data.location.localtime.split('').slice(11, this.lenght).join('');

  addHistoryElem(data, historyArr, time);

  return elem.insertAdjacentHTML('beforeend', `
        <div class="weather">
            <div class="upper-info">
                <div class="weather-icon">
                    <img src=${data.current.weather_icons[0]} alt="Weather icon">
                </div>
                <p class="temperature">${data.current.temperature}&deg;C</p>
                <p class="current-location">${data.location.name}, ${data.location.country}</p>
            </div>
            <div class="down-info">
                <p class="weather-item">Time: ${time}</p>
                <p class="weather-item">Feels like: ${data.current.feelslike}&deg;C</p>
                <p class="weather-item">Today is ${(data.current.weather_descriptions[0]).toLowerCase()}</p>
                <p class="weather-item">Wind: ${data.current.wind_dir}</p>
                <p class="weather-item">Speed: ${data.current.wind_speed} km/h</p>
                <p class="weather-item">Pressure: ${data.current.pressure} MB</p>
            </div>
            <button class="btn" id="showHistory">Show history</button>
        </div>
    `);
}

export function addHistoryElem(from, to, t) {
  const contain = to.find((elem) => elem.name.toLowerCase() == from.location.name.toLowerCase());

  if (!contain) {
    to.push({
      time: t,
      temperature: from.current.temperature,
      name: from.location.name,
      country: from.location.country,
      feelslike: from.current.feelslike,
      description: from.current.weather_descriptions[0],
      wind: from.current.wind_dir,
      pressure: from.current.pressure,
    });

    createHistoryTable('history-body', historyArr);
    localStorage.setItem('history', JSON.stringify(to));
  }
}

export function createHistoryTable(selector, arr, index = arr.length) {
  const elem = document.querySelector(`.${selector}`);

  elem.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${index}</td><td>${arr[index - 1].name}, ${arr[index - 1].country}</td><td>${arr[index - 1].time}</td><td>${arr[index - 1].temperature}</td><td>${arr[index - 1].feelslike}</td><td>${arr[index - 1].description}</td><td>${arr[index - 1].wind}</td><td>${arr[index - 1].pressure}</td>
        </tr>
    `);
}

export function createModalWindow(title, text, btnVal) {
  const errorWindow = document.getElementById('error-window');
  const modal = document.querySelector('.modal');

  modal.innerHTML = '';
  modal.insertAdjacentHTML('beforeend', `
        <h2>${title}</h2>
        <p class="text">${text}</p>
        <button class="btn" id="contine-btn">${btnVal}</button>
    `);

  const contineBtn = document.getElementById('contine-btn');
  errorWindow.classList.add('active');
  contineBtn.addEventListener('click', () => errorWindow.classList.remove('active'));
}
