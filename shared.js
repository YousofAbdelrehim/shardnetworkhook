async function handleSearch() {
    try {
        // Get the value entered in the search input field
        const searchQuery = document.getElementById('searchInput').value.trim();

        // Check if the search query is not empty
        if (searchQuery !== '') {
            // Construct the URL for the API endpoint
            const apiUrl = 'https://api.allorigins.win/get?url=https://' + encodeURIComponent(searchQuery);

            // Make a fetch request to the API endpoint
            const response = await fetch(apiUrl);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to fetch website content');
            }

            // Read the response as text
            const responseData = await response.text();

            // Attempt to parse the response text as JSON
            let data;
            try {
                data = JSON.parse(responseData);
            } catch (parseError) {
                throw new Error('Failed to parse JSON response');
            }

            // Check if the response contains valid JSON data
            if (!data || typeof data !== 'object' || !('contents' in data)) {
                throw new Error('Invalid response format');
            }

            // Check if the contents are empty
            if (!data.contents.trim()) {
                throw new Error('Empty response');
            }

            // Log the fetched website content to the console
            console.log(data.contents);
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = data.contents;

            // Set styles to make the div fullscreen
            contentDiv.style.position = 'fixed';
            contentDiv.style.top = '0';
            contentDiv.style.left = '0';
            contentDiv.style.width = '100%';
            contentDiv.style.height = '100%';
            contentDiv.style.zIndex = '9999';
            contentDiv.style.backgroundColor = '#fff'; // Set background color as needed
            contentDiv.focus();

            // Append the div to the body
            document.body.appendChild(contentDiv);
        } else {
            // Display an error message if the search query is empty
            console.error('Please enter a URL to fetch.');
        }
    } catch (error) {
        document.getElementById('searchError').textContent = "An Error Occurred! Please Try Again Later";
        document.getElementById('searchError').style.display = "block";
        document.getElementById('searchError').style.color = "red";
        document.getElementById('searchError').style.animation = "errorShake 0.5s ease-in-out step-end infinite";
        console.error('Error:', error.message);
    }
}
