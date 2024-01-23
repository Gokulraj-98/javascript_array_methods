//console.log("Hey Ter... keep rocking..!");
//XML -HTTP request are used to interact with the server vias API
//step1 - To create a XHR request
var request = new XMLHttpRequest();
//step2 - open a request
//the purpose is which API, and which API method
//this will take 2 important string
//first in http method as well as API
request.open("GET", "https://restcountries.com/v3.1/all");
//step3 - initiate a request
request.send();
//step4 - once the data successfully loaded from the server the status should be 200 ok
request.onload = () => {
  //var res = request.response;
  /*
  const res = JSON.parse(request.response);
  var first = res[0].name.nativeName.eng.official;
  for (var i = 0; i < res.length; i++) {
    var name = res[i].name.common;
    var capital = res[i].capital;
    console.log(name + "  capital- " + capital);
  }
  */

  const res = JSON.parse(request.response);

  //using filter
  var countryNames = res
    .filter((pop) => pop.population <= 200000)
    .map((names) => names.name.common);
  console.log(countryNames);

  //using reduce method
  var totalPop = res
    .map((pop) => pop.population)
    .reduce((acc, cv) => acc + cv, 0);
  console.log(totalPop);

  // using for each
  res.forEach((element) => {
    console.log(
      `Name :${element.name.common} 
Flag:${element.flag} 
Capital:${element.capital}`
    );
  });

  //countrieds that uses us dollars
  var countriesUsingDollars = res
    .filter((country) => {
      country.currencies;
    })
    .map((country) => country.name.common);
  console.log(countriesUsingDollars);
};

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countriesWithUSD = data
      .filter(
        (country) => country.currencies && country.currencies.USD !== undefined
      )
      .map((country) => country.name.common);
    for (var i = 0; i < countriesWithUSD.length; i++) {
      console.log("Countries using USD :", countriesWithUSD[i]);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
