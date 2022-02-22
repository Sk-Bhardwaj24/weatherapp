

    

    //         {
    //   "coord": {
    //     "lon": 73.8553,
    //     "lat": 18.5196
    //   },
    //   "weather": [
    //     {
    //       "id": 804,
    //       "main": "Clouds",
    //       "description": "overcast clouds",
    //       "icon": "04n"
    //     }
    //   ],
    //   "base": "stations",
    //   "main": {
    //     "temp": 300.82,
    //     "feels_like": 299.62,
    //     "temp_min": 300.82,
    //     "temp_max": 300.82,
    //     "pressure": 1009,
    //     "humidity": 18,
    //     "sea_level": 1009,
    //     "grnd_level": 948
    //   },
    //   "visibility": 10000,
    //   "wind": {
    //     "speed": 4.47,
    //     "deg": 304,
    //     "gust": 6.48
    //   },
    //   "clouds": {
    //     "all": 95
    //   },
    //   "dt": 1645363247,
    //   "sys": {
    //     "country": "IN",
    //     "sunrise": 1645320593,
    //     "sunset": 1645362428
    //   },
    //   "timezone": 19800,
    //   "id": 1259229,
    //   "name": "Pune",
    //   "cod": 200
    // }

    //    fetching data for weather
    let weatherkey = "962d344b2336aa171c4f0fbac6e1cf7b";
    async function getData() {
      let city = document.getElementById("city").value;
      let cont = document.getElementById("container");
      cont.textContent = "";
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherkey}&units=metric`
      );
      let whe_data = await res.json();
      dispayweather(whe_data);

      let lat = whe_data.coord.lat;
      let lon = whe_data.coord.lon;
      getdaily(lat, lon);
    }

    async function getdaily(lat, lon) {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${weatherkey}&units=metric`
      );
      let daily_data = await res.json();
      displaydaily(daily_data);
    }

    // min temp, max temp, wind, clounds, sunrise, sunset

    function dispayweather(data) {
      let imag = document.createElement("img");
      imag.src =
        "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_43-256.png";
      //  displaying tha weather data on left hand side

      let div = document.getElementById("container");

      let div2 = document.createElement("div");
      let div3 = document.createElement("div");

      let p = document.createElement("p");
      p.textContent = "City : " + data.name;
      let p1 = document.createElement("p");
      //   p1.append(imag);
      p1.innerHTML = imag;
      p1.textContent = "Temperature : " + data.main.temp + "°C";

      let p2 = document.createElement("p");
      p2.textContent = "Min-Temperature : " + data.main.temp_min + "°C";
      let p3 = document.createElement("p");
      p3.textContent = "Max-Temperature : " + data.main.temp_max + "°C";

      let p4 = document.createElement("p");
      p4.textContent = "Speed : " + data.wind.speed + " " + "Meter/sec";
      let p5 = document.createElement("p");
      p5.textContent = "Clouds : " + data.clouds.all + "%";
      //   let p6=document.createElement("p");

      let iframe = document.createElement("iframe");
      iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

      div2.append(imag, p, p1, p2, p3, p4, p5);
      div3.append(iframe);
      div.append(div2, div3);
    }

    function displaydaily(data) {
      // console.log(data);
      // console.log("hi");
      datadaily = data.daily;
      let bottom = document.getElementById("bottom");
      bottom.textContent = "";
      datadaily.forEach((ele) => {
        let cont = document.createElement("div");
        let dayp = document.createElement("p");
        let imag=document.createElement("img");
        // console.log(ele.weather);
       weathcon(ele,imag);
        let day = dayname(ele.dt);
        dayp.textContent = day;
        let maxt = document.createElement("p");
        maxt.textContent = ele.temp.max + "°C";

        let mint = document.createElement("p");
        mint.textContent = ele.temp.min + "°C";

        cont.append(dayp,imag, maxt, mint);
        bottom.append(cont);
      });
    }
      function weathcon(data,imag){
       dataw=data.weather;


    //  console.log(typeof(dataw.id));
     dataw.forEach((ele)=>{
      // var imag=document.createElement("img");
        // console.log(ele.icon);
        // console.log("hi");
        if(ele.icon=="01d"){
          imag.src="https://icons.iconarchive.com/icons/icons-land/weather/256/Sunny-icon.png";
        }
        else if(ele.icon=="02d"){
          imag.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Gnome-weather-few-clouds.svg/1024px-Gnome-weather-few-clouds.svg.png";
        }
        else if(ele.icon=="03d"){
          imag.src="https://jooinn.com/images/clouds-scattering-1.jpg";
        } else if(ele.icon=="04d"){
          imag.src="http://openweathermap.org/img/wn/04d@2x.png";
        }
        else if(ele.icon=="09d"){
          imag.src="https://w7.pngwing.com/pngs/68/248/png-transparent-clouds-blue-day-weather-sky-cloudy-cloudscape-climate-atmosphere-air.png";
        }
         else if(ele.icon=="10d"){
        //  imag.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXqyPgCRcdFS8FlZkkg2OIQiXu85GHmVT7A9IgL3AHIU5eXNh73ZvR85bNEATfZxtQ9k&usqp=CAU";
          imag.src="https://toppng.com/uploads/preview/rain-cloud-weather-icon-png-clip-art-transparent-background-rain-clipart-11563114842tvlqz23vxh.png";
        } else if(ele.icon=="11d"){
          imag.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDQiz1tzhbC6CVDvJU6WPNDMStNRrvyc_sw&usqp=CAU";
        } else if(ele.icon=="13d"){
          imag.src="http://openweathermap.org/img/wn/13d@2x.png"
        } else if(ele.icon=="50d"){
          imag.src="http://openweathermap.org/img/wn/50d@2x.png";
        }


     });

     
      }


    function dayname(unixTime) {
      // const unixTime =   1645466400;
      const date = new Date(unixTime * 1000);
      // console.log(date.toLocaleDateString("en-IN"));
      var utcString = date.toUTCString();
      var day = utcString.slice(0, 3);
      return day;
    }