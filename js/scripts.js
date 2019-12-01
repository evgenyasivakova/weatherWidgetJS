const weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247';

const body = document.body;
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.appendChild(wrapper);

const topDiv = document.createElement('div');
topDiv.classList.add('top-weather');
wrapper.appendChild(topDiv);

const bottomDiv = document.createElement('ul');
bottomDiv.classList.add('bottom-weather');
wrapper.appendChild(bottomDiv);


fetch(weatherApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    renderList(response);
  })

function renderList(response) {
    bottomDiv.innerHTML = "";

    const {city} = response;
    const list = response.list[0];

    const locationDiv = document.createElement('div');
    locationDiv.textContent = city.name + ', ' + city.country;
    topDiv.appendChild(locationDiv);

    const currentTimeDiv = document.createElement('div');
    setInterval(function() {
        currentTimeDiv.textContent = new Date().toLocaleTimeString();
    }, 1000);
    topDiv.appendChild(currentTimeDiv);

    const currentWeatherDiv = document.createElement('div');
    currentWeatherDiv.textContent = list.weather[0].main;
    topDiv.appendChild(currentWeatherDiv);

    const currentTempretureDiv = document.createElement('div');
    currentTempretureDiv.textContent = Math.floor(list.main.temp - 273) + ' ℃';
    topDiv.appendChild(currentTempretureDiv);

    const directionWindDiv = document.createElement('div');
    const deg = list.wind.deg;
    const direction = getDirectionWind(deg);
    directionWindDiv.textContent = direction;
    topDiv.appendChild(directionWindDiv);

    const speedWindDiv = document.createElement('div');
    speedWindDiv.textContent = Math.floor(list.wind.speed) + ' m/s';
    topDiv.appendChild(speedWindDiv);

    for(let i = 0; i < response.list.length; i+=8) {
        const li = renderItem(response.list[i]);
        bottomDiv.appendChild(li);
    }
}

function getDirectionWind(deg) {
    if(deg < 90) {
        return 'North-West';
    } else if(deg = 90) {
        return 'North';
    } else if(deg < 180) {
        return 'North-East';
    } else if(deg = 180) {
        return 'East';
    } else if(deg < 270) {
        return 'South-East';
    } else if(deg = 270) {
        return 'South';
    } else if(deg <360) {
        return 'South-West';
    } else {
        return 'West';
    }
}

function renderItem(item) {
    const wrapperLi = document.createElement('li');
    const tagDate = document.createElement('div');
    tagDate.classList.add('time');
    tagDate.textContent = item.dt_txt;
    wrapperLi.appendChild(tagDate);

    const img = document.createElement('img');
    img.src = 'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png';
    wrapperLi.appendChild(img);

    const tagTemp = document.createElement('div');
    tagTemp.textContent = Math.floor(item.main.temp - 273) + ' ℃';
    wrapperLi.appendChild(tagTemp);
    
    return wrapperLi;
}
