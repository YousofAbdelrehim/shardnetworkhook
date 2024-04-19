async function handleSearch() {
    try {
        // Get the value entered in the search input field
        const searchQuery = document.getElementById('searchInput').value.trim();

        // Check if the search query is not empty
        if (searchQuery !== '') {
            document.getElementById('searchError').textContent = "Searching...";
            document.getElementById('searchError').style.display = "block";
            document.getElementById('searchError').style.color = "white";
            document.getElementById('searchError').style.textShadow = "none";
            document.getElementById('searchError').style.animation = "successShake 0.5s ease-in-out step-end infinite";
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
            contentDiv.id = 'contentDiv';
            contentDiv.style.backgroundColor = '#fff'; // Set background color as needed

            const contentDivLinks = contentDiv.querySelectorAll('a');
            contentDivLinks.forEach(link => {
                link.onclick = async (event) => {
                    event.preventDefault();
                    console.log(link.href);
                    // Fetch and display the content of the clicked link
                    await fetchAndDisplay(link.href);
                }  
            });

            const contentDivImages = contentDiv.querySelectorAll('img');
            contentDivImages.forEach(image => {
                function loadImages() {
                    image.src = image.dataset.src;
                }
                document.addEventListener('DOMContentLoaded', loadImages);
            });
            
            const contentDivVideos = contentDiv.querySelectorAll('video');
            contentDivVideos.forEach(video => {
                function loadVideos() {
                    video.src = video.dataset.src;
                }
                document.addEventListener('DOMContentLoaded', loadVideos);
            });

            const contentDivStyleSheets = contentDiv.querySelectorAll('link[rel="stylesheet"]');
            contentDivStyleSheets.forEach(styleSheet => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = styleSheet.href;
                document.head.appendChild(link);
            });

            const contentDivScripts = contentDiv.querySelectorAll('script');
            contentDivScripts.forEach(script => {
                const scriptTag = document.createElement('script');
                scriptTag.src = script.src;
                document.body.appendChild(scriptTag);
            });


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

async function fetchAndDisplay(url) {
    try {
        // Make a fetch request to the clicked link URL
        const response = await fetch('https://api.allorigins.win/get?url=' + url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to fetch website content');
        }

        // Read the response as text
        const responseData = await response.text();
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
        // Create a new div to display the fetched website content
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = data.contents;

        // Set styles to make the div fullscreen
        contentDiv.style.position = 'fixed';
        contentDiv.style.top = '0';
        contentDiv.style.left = '0';
        contentDiv.style.width = '100%';
        contentDiv.style.height = '100%';
        contentDiv.style.zIndex = '9999';
        contentDiv.id = 'contentDiv';
        contentDiv.style.backgroundColor = '#fff'; // Set background color as needed

        // Fix SVG attributes if present
        const svgs = contentDiv.querySelectorAll('svg');
        svgs.forEach(svg => {
            // Check if the width attribute contains escaped quotes
            const width = svg.getAttribute('width');
            if (width && width.includes('\\\"')) {
                // Replace escaped quotes with regular quotes
                svg.setAttribute('width', width.replace(/\\\"/g, '"'));
            }
        });

        const contentDivLinks = contentDiv.querySelectorAll('a');
            contentDivLinks.forEach(link => {
                link.onclick = async (event) => {
                    event.preventDefault();
                    console.log(link.href);
                    // Fetch and display the content of the clicked link
                    await fetchAndDisplay(link.href);
                }  
            });
            
        // Append the div to the body
        document.body.appendChild(contentDiv);
    } catch (error) {
        console.error('Error fetching and displaying content:', error.message);
    }
}

