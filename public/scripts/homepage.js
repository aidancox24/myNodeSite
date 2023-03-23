document.addEventListener("DOMContentLoaded", () => {
    // Load data from data/services.html into services container
    $(".services-container").load('data/services');
});

function setHeroImageHeight() {
    $(".hero-image").css({
        "height": `${window.innerHeight * 0.60}px`
    });
}

setHeroImageHeight();

window.addEventListener('resize', () => {
    setHeroImageHeight();
});
