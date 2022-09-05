const url = "https://restcountries.com/v3.1/all";
const contriesApiContainer = document.querySelector(".contriesApiContainer");
const allCountries = [];
const search = document.querySelector(".search");
const countryDropdown = document.querySelector("#countryDropdown");
let countries = [];
const mode = document.querySelector("body");



document.addEventListener("DOMContentLoaded", getCountry())

countryDropdown.addEventListener("click", (e) =>{
  if(countryDropdown.value === ""){
    getCountry()
  }else{
    getCountryByRegion()
  }
})

async function getCountry() {
    
        const res = await fetch(url);
        const data = await res.json(); 
       
        // console.log(data)
        contriesApiContainer.innerHTML = "";
        data.forEach(element => {
        country = document.createElement('div')
        allCountries.push(country);
        country.innerHTML = `
            <img id="img" src="${element.flags.svg}" alt="">
            <div class="detail">
                <h3 class: "countryName">Name: ${element.name.common}</h3>
                <p>Population: ${element.population}</p>
                <p>Region: ${element.region}</p>
                <p>Capital: ${element.capital}</p>
            </div>
        `
        country.classList.add("country")
    
    contriesApiContainer.appendChild(country)

    countries = document.querySelectorAll(".country")
    
    countries.forEach(country => {
      country.addEventListener("click", function(e){
        e.preventDefault()
        getEachCountry()
      })
    })
    });
}


async function getCountryByRegion(){
  const response = await fetch(`https://restcountries.com/v3.1/region/${countryDropdown.value}`)
  const data = await response.json();

  contriesApiContainer.innerHTML = "";
        data.forEach(element => {
        country = document.createElement('div')
        allCountries.push(country);
        country.innerHTML = `

          <img id="img" src="${element.flags.svg}" alt="">
          <div class="detail">
              <h3 class: "countryName">Name: ${element.name.common}</h3>
              <p>Population: ${element.population}</p>
              <p>Region: ${element.region}</p>
              <p>Capital: ${element.capital}</p>
          </div>

        `
        country.classList.add("country")
    
    contriesApiContainer.appendChild(country)
    });
}

search.addEventListener('keyup', (e) => {
    e.preventDefault();
    
    allCountries.forEach((h) => {
     
        if(h.innerText.toLowerCase().includes(e.target.value.toLowerCase().trim())){
          h.classList.remove('MCountry')
        }else{
          h.classList.add('MCountry')
        }
   })
})


async function getEachCountry(){
   const respo = await fetch(`https://restcountries.com/v3.1/name/${country.value}`);
   const data = await respo.json();
   
   country.addEventListener("click", el => {
    data.forEach((el) => {
       country.createElement('div')
       allCountries.push(country)

       country.innerHTML = `

       <div class="eachCountry">
        <img id="eachCountryImg" src="${el.flags.svg}" alt="">
        <h2 class="countryName">Name: ${el.name.common}</h2>
      <div class="firstDiv">
        <div class="countryDetails">
          <p class="population">Population: ${el.population}</p>
          <p class="Region">Region: ${el.region}</p>
          <p class="subRegion">Sub-Regin: West Africa</p>
          <p class="Capital">Capital: ${el.capital}</p>
        </div>

        <div class="countryDetails">
            <p class="topLevel">Top level Domain:be</p>
            <p class="Currency">Currency: ${el.currencies.name}</p>
            <p class="lang">Language: ${el.language}</p>
        </div>
    </div>
    <div class="borderCoutry">
    <div>Border Countries:${el.borders}</div>
    <div id="border">Chad</div>
    <div id="border">Niger</div>
    <div id="border">Cameroon</div>
    </div>

    </div>
 `

    }) 
   })
}

function dark() {
  const darkMe = document.querySelector("#darkMe");
  darkMe.addEventListener("click", ()=> {
    mode.classList.toggle("dark-mode");
  })
  
}
dark()
