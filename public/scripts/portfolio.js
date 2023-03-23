document.addEventListener("DOMContentLoaded", () => {
    renderPortfolioContent();
});

/**
 * Retrieves a list of photos from the database
 *
 * @param {Function} callback Function to call with retrieved photos.
 */
function getPortfolioPhotos(callback) {
    // Make a AJAX request
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        // Check if the request was successful
        if (xhr.status === 200) {
            // Get the response as XML
            const response = xhr.responseXML;

            // Get all photo objects from response
            const data = response.getElementsByTagName("photo");

            const photos = [];

            for (let i = 0; i < data.length; i++) {
                let photo = {};
                photo["highres"] = data[i].getElementsByTagName("highres")[0].getElementsByTagName("src")[0].textContent;
                photo["lowres"] = data[i].getElementsByTagName("lowres")[0].getElementsByTagName("src")[0].textContent;
                photo["alt"] = data[i].getElementsByTagName("alt")[0].textContent;
                photos.push(photo);
            }
            // Pass the photos to the callback function
            callback(photos);
        }
    };
    // Open a GET request
    xhr.open("GET", "data/portfolio-images.xml", true);
    xhr.send(null);
}

/**
 * Renders the portfolio page
 */
function renderPortfolioContent() {
    const $portfolio = $("#portfolio");

    getPortfolioPhotos(photos => {
        // Check if photos are found
        if (!photos || !photos.length) {
            const $message = $("<h3>", { text: "No portfolio photos found." });
            $portfolio.append($message);
            return;
        }

        // Loop through photos object array
        for (let i = 0; i < photos.length; i++) {
            const $photo = $("<img>", {
                class: "portfolio-photo",
                src: photos[i].lowres,
                alt: photos[i].alt,
                click: function () {
                    $portfolio.hide();
                    renderSlideshow(i, photos);
                }
            });

            $portfolio.append($photo);
        }
    });
}

/**
 * Renders a slideshow starting at the current photo
 * @param {number} currentPhoto Index of current photo in photos 
 * @param {object} photos Array of portfolio photos 
 */
function renderSlideshow(currentPhoto, photos) {
    $portfolioSlideshowContainer = $(".portfolio-slideshow-container")
        .empty().css({ "display": "block" });

    $slideshowPhoto = $("<img>", {
        class: "slideshow-photo",
        src: photos[currentPhoto].highres,
    });

    $prevPhoto = $("<i>", {
        class: "fa-solid fa-angle-left prev-photo",
        click: function () {
            currentPhoto--;
            if (currentPhoto < 0) {
                currentPhoto = photos.length - 1;
                currentPhoto--;
            }
            $slideshowPhoto.attr("src", photos[currentPhoto].highres);
        }
    });
    $nextPhoto = $("<i>", {
        class: "fa-solid fa-angle-right next-photo",
        click: function () {
            currentPhoto++;
            if (currentPhoto > photos.length - 1) {
                currentPhoto = 0;
                currentPhoto++;
            }
            $slideshowPhoto.attr("src", photos[currentPhoto].highres);
        }
    });
    $closeSlideshow = $("<i>", {
        class: "fa-solid fa-xmark close-slideshow",
        click: function () {
            $("#portfolio").show();
            $portfolioSlideshowContainer.css({ "display": "none" });
        }
    });

    $portfolioSlideshowContainer.append([$prevPhoto, $slideshowPhoto, $nextPhoto, $closeSlideshow]);
}


