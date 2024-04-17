function handleSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        document.getElementById('searchError').innerText = "Please Enter a search term!";
        document.getElementById('searchError').style.display = 'block';
        document.getElementById('searchError').style.animation = 'errorShake 0.5s ease';
        return;
    }
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var headers = new Headers();
    headers.append('Origin', window.location.origin);
    headers.append('Referer', window.location.origin);
    fetch(`${proxyUrl}https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`${response.status} (${response.statusText})`);
        }
    })
    .then(data => {
        var iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.contentDocument.open();
        iframe.contentDocument.write(data);
        iframe.contentDocument.close();
        var searchResultsContainer = document.getElementById('searchResultsContainer');
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.appendChild(iframe);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while searching.');
    });
    // window.location.href = searchResultURL; // Removed this line, as searchResultURL is not defined
}