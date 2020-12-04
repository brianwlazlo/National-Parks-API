const apiKey = 'bUuIqZwBZHS2si9wCggO0xerhTkZM98OSBPf9v1a'

const baseURL = 'https://developer.nps.gov/api/v1/parks'


function formatQueryParams (params) {
    const queryItems = Object.keys(params)
            .map(key => `${key}=${params[key]}`);
    return queryItems.join('&');
}

function getParkList (query, maxResults=10) {
    const params = {
        stateCode: query,
        limit: maxResults
    };

    const queryString = formatQueryParams(params);
    const url = baseURL + '?' + queryString + '&api_key=' + apiKey;

    console.log(url);

    fetch(url)
        .then(response=> response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert("Sorry, there seems to be a problem. Please try again later."));

}

function displayResults(responseJson) {
    console.log(responseJson);

    $('ol').empty();
    
    for (let i=0; i<responseJson.data.length; i++) {     
        $('ol').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p id='description'>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url} target="_blank">${responseJson.data[i].url}</a>
            </li>`
        );
    
        
    };
    
    $('#results').removeClass('hidden');
};


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#state-selector').val().join(',');
      const maxResults = $('#js-max-results').val();
      getParkList(searchTerm, maxResults);
    });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});;