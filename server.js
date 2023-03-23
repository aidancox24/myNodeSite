const http = require("http");
const fs = require("fs");

const port = 1337;

function serveStaticFile(response, path, contentType, responseCode = 200) {
    fs.readFile(`${__dirname}${path}`, (err, data) => {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });

            response.end("500 Internal Service Error");
        } else {
            response.writeHead(responseCode, { "Content-Type": contentType });

            response.end(data);
        }
    });
}

http.createServer((request, response) => {
    // Remove the query string and make it lowercase
    const path = request.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

    switch (path) {
        case "":
            serveStaticFile(response, "/public/index.html", "text/html");
            break;

        // html
        case "/booking":
        case "/contact":
        case "/about":
        case "/portfolio":
        case "/data/about-content": // data
        case "/data/services": // data
            serveStaticFile(response, `/public${path}.html`, "text/html");
            break;

        // css
        case "/styles/main.css":
        case "/styles/custom-elements.css":
            serveStaticFile(response, `/public${path}`, "text/css");
            break;

        // svg
        case "/images/facebook.svg":
        case "/images/instagram.svg":
        case "/images/twitter.svg":
            serveStaticFile(response, `/public${path}`, "image/svg+xml");
            break;

        // jpg
        case "/images/farm.jpg":
        case "/images/forest.jpg":
        case "/images/hero.jpg":
        case "/images/house.jpg":
        case "/images/river.jpg":
        case "/images/sky.jpg":
        case "/images/trees.jpg":
        case "/images/farm-1600x900.jpg":
        case "/images/forest-1600x900.jpg":
        case "/images/hero-1600x900.jpg":
        case "/images/house-1600x900.jpg":
        case "/images/river-1600x900.jpg":
        case "/images/sky-1600x900.jpg":
        case "/images/trees-1600x900.jpg":
            serveStaticFile(response, `/public${path}`, "image/jpg");
            break;

        // png
        case "/images/logo-black.png":
        case "/images/logo-white.png":
            serveStaticFile(response, `/public${path}`, "image/png");
            break;

        // mp4
        case "/images/pool.mp4":
            serveStaticFile(response, `/public${path}`, "video/mp4");
            break;

        // JavaScript
        case "/scripts/about.js":
        case "/scripts/booking.js":
        case "/scripts/contact.js":
        case "/scripts/custom-elements.js":
        case "/scripts/homepage.js":
        case "/scripts/jquery-3.6.3.js":
        case "/scripts/portfolio.js":
            serveStaticFile(response, `/public${path}`, "text/javascript");
            break;

        // json
        case "/data/available-times.json":
            serveStaticFile(response, `/public${path}`, "application/json");
            break;

        // xml
        case "/data/portfolio-images.xml":
            serveStaticFile(response, `/public${path}`, "application/xml");
            break;

        default:
            serveStaticFile(response, "/public/404.html", "text/html", 404);
            break;
    }
}).listen(port);

console.log(`Server is Started at port : ${port} (http://localhost:${port})`);

