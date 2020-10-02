

//ref from https://codepen.io/tutsplus/details/gObLaEP and edited to suit this project
const form = document.querySelector(".search-form form");
const input = document.querySelector(".search-form input");
const msg = document.querySelector(".search-form .msg");
const cards = document.querySelector(".weather-cards .row");

const apiKey = "#";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const cardItems = cards.querySelectorAll(".weather-cards");
  const cardItemsArray = Array.from(cardItems);

  if (cardItemsArray.length > 0) {
    cardItemsArray.filter(el => {
      let content = "";
      
      if (inputVal.includes(",")) {
      } else {
        content = el.querySelector(".city-name span").textContent();
      }
    return content == inputVal();
    });

  };

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}, ${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;


      const card = document.createElement("card");
        card.classList.add("city,country");
        
        //add card deck
        const markup = `
          <div class="col-sm d-flex">
              <div class="card card-body flex-fill border-warning">
                <h2 class="card-title city-name text-info data-name="${name},${sys.country}">
                  <span>${name}</span>
                  <sup>${sys.country}</sup>
                </h2>
              </div>
            </div>

            <div class="col-sm d-flex">
              <div class="card card-body flex-fill mb-3 bg-light border-warning">
              <h3 class="card-text city-temp text-info">Currently: ${Math.round(main.temp)}<sup>°C</sup></h3>
              <h5 class="card-text city-temp text-info">Feels Like: ${Math.round(main.feels_like)}<sup>°C</sup></h5>
                <img class="card-img-bottom city-icon" src="${icon}" alt="${weather[0]["description"]}">
                <p class="card-text"><small class="text-muted d-flex justify-content-center">${weather[0]["description"]}</small></p>
              </div>
            </div>
        `; 
        
        card.innerHTML = markup;
        cards.appendChild(card);
        form.reset();
        input.focus();
        
      })
      
      .catch(() => {
      msg.textContent = "Enter valid CityName, Country.";
      form.reset();
      input.focus();
    
    });
  
});


//ref from https://www.ricocheting.com/code/javascript/html-generator/date-time-clock and edited to suit this project

let tday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let tmonth=["January","February","March","April","May","June","July","August","September","October","November","December"];

function GetClock(){
  let d=new Date();
  let nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
  let nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

let clocktext=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
document.getElementById('clockbox').innerHTML=clocktext;
}

GetClock();
setInterval(GetClock,1000);
