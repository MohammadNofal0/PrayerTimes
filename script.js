"use strict";

// Get the elements
const searchBtn = document.getElementById("search");
const country = document.getElementById("country-select");
const city = document.getElementById("city-select");
const fajir = document.getElementById("fajir");
const sunrise = document.getElementById("sunrise");
const duhur = document.getElementById("duhur");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");
const date = document.getElementById("date");
const day = document.getElementById("day");

searchBtn.addEventListener("click", onClick);

function onClick() {
  const countryValue = country.value;
  const cityValue = city.value;

  if (!cityValue || !countryValue) {
    alert("empty field");
  } else {
    getPrayersTimingsByCountryAndCity(countryValue, cityValue);
  }
}

function getPrayersTimingsByCountryAndCity(countryname, cityname) {
  let params = {
    country: countryname,
    city: cityname,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timingsOfPrayers = response.data.data.timings;
      const dateOfTheDay = response.data.data.date.gregorian.date;
      const day = response.data.data.date.hijri.weekday.ar;
      document.getElementById("date").innerHTML = dateOfTheDay;
      document.getElementById("day").innerHTML = day;
      fillTimeForPrayers("fajir", timingsOfPrayers.Fajr);
      fillTimeForPrayers("sunrise", timingsOfPrayers.Sunrise);
      fillTimeForPrayers("duhur", timingsOfPrayers.Dhuhr);
      fillTimeForPrayers("asr", timingsOfPrayers.Asr);
      fillTimeForPrayers("maghrib", timingsOfPrayers.Maghrib);
      fillTimeForPrayers("isha", timingsOfPrayers.Isha);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fillTimeForPrayers(id, time) {
  document.getElementById(id).innerHTML = time;
}
