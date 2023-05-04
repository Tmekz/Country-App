const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const alpha = document.getElementById("alpha");
const minToMax = document.getElementById("minToMax");
const maxToMin = document.getElementById("maxToMin");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "maxToMin";
const fetchCountries = async (search) => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
};
const countriesDisplay = async () => {
  await fetchCountries();
  countriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
    <img src=${country.flags.svg} alt="Photo de ${
          country.translations.fra.common
        }">
    <h2>${country.translations.fra.common}</h2>
    <h4>${country.capital}</h4>
    <p>Population : ${country.population.toLocaleString()}</p>  
    </div>
    `
    )
    .join("");
};
window.addEventListener("load", countriesDisplay());
inputSearch.addEventListener("input", countriesDisplay);

inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
