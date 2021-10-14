
function fetchCountry (searchQuery) {
    return  fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then( response => response.json())
  }
export default {fetchCountry}