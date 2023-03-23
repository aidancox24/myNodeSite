document.addEventListener("DOMContentLoaded", () => {
    getAboutContent();
});

/**
 * Retrieves the contents of an about page
 */
function getAboutContent() {
    // Make a AJAX request
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        // Check if the request was successful
        if (xhr.status === 200) {
            const response = xhr.responseText;
            const content = ("<div>").html = response;

            // Add response to about page
            $("#about").append(content);
            // initMap();
        }
    };
    // Open a GET request 
    xhr.open("GET", "data/about-content", true);
    xhr.send(null);
}

/**
 * Initialize a map of Mendon, MA using Google Map API
 */
function initMap() {
    // Coordinates of Mendon, MA
    const mendon = {
        lat: 42.106,
        lng: -71.555,
    };

    // New instance of Google Map of Mendon
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: mendon
    });

    // Add a marker at Mendons position on the map
    const marker = new google.maps.Marker({
        position: mendon,
        map: map,
    });
}

window.initMap = initMap;