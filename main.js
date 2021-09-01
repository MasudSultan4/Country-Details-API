
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
// error 
const errorDiv =  document.getElementById('error');
// details 
const countryDetailsDiv = document.getElementById('country-details');
// spinner
const spinner = document.getElementById('spinner');


searchBtn.addEventListener('click', captureInputValue)

function captureInputValue() {
    const search = searchInput.value;
    if(search === ""){
     errorDiv.innerText = 'Search fild cannot be empty';
     return;
    }
    // clear 
    countryContainer.textContent = '';
    searchInput.value ='';
    
    spinner.classList.remove('d-none')
    fetch(`https://restcountries.eu/rest/v2/name/${search}`)
        .then(res => res.json())
        .then(data => displayCountris(data))
        .finally(() =>  spinner.classList.add('d-none')
        )
   
}


const displayCountris = data => {
  
    // error clear and handaling
    if(data.status === 404){
     errorDiv.innerText = 'No Result Found';
     return;
   }
   else{
     errorDiv.innerText = '';
   }

     data.forEach(country => {
        //  console.log(country);
         const div = document.createElement('div')
         div.classList.add('col-md-3')
         div.innerHTML = `
    <div class="rounded overflow-hidden border p-2">
      <img
        src="${country.flag}"
        class="w-100"
        alt=""
      />
    </div>
    
    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
    >
      <h3>${country.name}</h3>
      <button onclick="countryDetails('${country.alpha3Code}')" class="btn btn-dark">Learn More</button>
    </div>
  
 `
         countryContainer.appendChild(div)
     })
 
}


const countryDetails = details => {
  
fetch(`https://restcountries.eu/rest/v2/alpha/${details}`)
.then(res => res.json())
.then(data => {
  countryDetailsDiv.innerHTML = `
  <div class="row">
    <div class="col-md-12">
      <h1>code: ${data.currencies[0].code}</h1>
      <p>Money-name: ${data.currencies[0].name}</p>
      <p>Money-symbol: ${data.currencies[0].symbol}</p>
    </div>
  </div>
  <hr />
`
})
}

