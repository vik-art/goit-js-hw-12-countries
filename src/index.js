import './styles.css';
import API from './fetchCountries';
import refs from './refs';
import countryTpl from './templates/country-item.hbs';
import countriesTpl from './templates/country-list.hbs';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css'; 


const debounce = require('lodash.debounce');
let searchQuery = ' ';

refs.inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    resetSearchForm();
    searchQuery = refs.inputRef.value;
    if(!searchQuery) {
        return
    }
    API.fetchCountry(searchQuery)
    .then(verification)
    .catch(err => {console.log('err')
})
}

function resetSearchForm() {
    refs.containerRef.innerHTML = '';
}

function verification (countries) {
if(countries.length > 10) {
    errorMessage(error, "Too many matches. Please be more specific!")
} else if(countries.length <= 10 && countries.length > 1) {
    renderCountryCard(countriesTpl, countries);
}else if(countries.length === 1) {
    renderCountryCard(countryTpl, countries);
} else {
    errorMessage(info, "No matches found")
}
}

function errorMessage(typeInfo, textInfo) {
    typeInfo({
        text: `${textInfo}`,
        delay: 1000,
        closeHover: true
    })
}

function renderCountryCard(tpl, countries) {
    refs.containerRef.insertAdjacentHTML('beforeend', tpl(countries))
}

