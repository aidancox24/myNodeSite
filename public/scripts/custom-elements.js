document.addEventListener("DOMContentLoaded", () => {
    createNavbar();
    createSidenav();
    createFooter();

    const $navbarScroll = $("#navbar");

    window.onscroll = () => {
        window.scrollY > 0 ? $navbarScroll.addClass("scrolling") : $navbarScroll.removeClass("scrolling");
    };
});

function toggleSidenav() {
    $("#sidenav").toggleClass("show");
}

const services = [
    {
        text: "Photography",
        href: "booking?service=photography",
    },
    {
        text: "Videography",
        href: "booking?service=videography",
    },
];

const navLinks = [
    {
        text: "Portfolio",
        href: "portfolio",
    },
    {
        text: "About",
        href: "about",
    },
    {
        text: "Contact",
        href: "contact",
    },
];

const socialLinks = [
    {
        href: "https://www.instagram.com/",
        src: "images/instagram.svg",
        alt: "Instagram",
    },
    {
        href: "https://twitter.com/",
        src: "images/twitter.svg",
        alt: "Twitter",
    },
    {
        href: "https://www.facebook.com/",
        src: "images/facebook.svg",
        alt: "Facebook",
    },
];

/**
 * Create the navbar element 
 */
function createNavbar() {
    // Create navbar element
    const $navbar = $("#navbar");

    // Create navbar brand
    const $navbarBrand = $("<a>", {
        class: "navbar-brand",
        href: "/",
    });
    const $logo = $("<img>", {
        src: "images/logo-black.png",
        alt: "logo",
    });
    $navbarBrand.append($logo);
    $navbar.append($navbarBrand);

    // create navbar menu
    const $navbarMenu = $("<ul>", { class: "navbar-menu" });

    // Create services dropdown item
    const $navbarItem = $("<li>", {
        class: "navbar-item navbar-dropdown",
        click: function () {
            $(this).toggleClass("selected");
            const $dropdownContent = $(".navbar-dropdown-content");
            $dropdownContent.slideToggle("fast", function () {
                const $dropdownIcon = $(".navbar-dropdown-icon");
                $dropdownIcon.removeClass("fa-chevron-up fa-chevron-down");
                $dropdownIcon.addClass(`fa-chevron-${$(this).is(":hidden") ? "down" : "up"}`);
            });
        },
    });

    const $navbarDropdownText = $("<span>").text("Services ");
    const $dropdownStatus = $("<i>", { class: "navbar-dropdown-icon fa-solid fa-chevron-down fa-xs" });
    $navbarItem.append([$navbarDropdownText, $dropdownStatus]);

    const $navbarDropdownContent = $("<div>", { class: "navbar-dropdown-content" });
    $.map(services, service => {
        const $navbarLink = $("<a>", {
            class: "navbar-link navbar-dropdown",
            href: service.href,
            text: service.text,
        });
        $navbarDropdownContent.append($navbarLink);
    });
    $navbarItem.append($navbarDropdownContent);

    $navbarMenu.append($navbarItem);

    // create navbar items
    $.map(navLinks, navLink => {
        const $navbarItemLink = $("<a>", { href: navLink.href });

        const $navbarItem = $("<li>", {
            class: "navbar-item",
            text: navLink.text,
        });

        $navbarItemLink.append($navbarItem);

        $navbarMenu.append($navbarItemLink);
    });

    // create open sidenav item
    const $openSidenavItem = $("<li>", {
        class: "navbar-item open-sidenav-button",
        click: toggleSidenav,
    });
    const $openSidenavLink = $("<i>", { class: "fa-solid fa-bars  open-sidenav-button" });

    $openSidenavItem.append($openSidenavLink);
    $navbarMenu.append($openSidenavItem);

    $navbar.append($navbarMenu);
}

/**
 * Create the sidenav element 
 */
function createSidenav() {
    const $sidenav = $("#sidenav");

    const $sidenavMenu = $("<ul>", { class: "sidenav-menu" });

    // Create close sidenav button element
    const $sidenavCloseBtn = $("<i>", {
        class: "fa-solid fa-xmark fa-xl close-sidenav-btn",
        click: toggleSidenav,
    });

    const $closeBtnListItem = $("<li>").append($sidenavCloseBtn);

    $sidenavMenu.append($closeBtnListItem);

    // Create services dropdown item
    const $sidenavItem = $("<li>", {
        class: "sidenav-item sidenav-dropdown",
        click: function () {
            $(this).toggleClass("selected");
            const $dropdownContent = $(".sidenav-dropdown-content");
            $dropdownContent.slideToggle("fast", () => {
                const $dropdownIcon = $(".sidenav-dropdown-icon");
                $dropdownIcon.removeClass("fa-chevron-up fa-chevron-down");
                $dropdownIcon.addClass(`fa-chevron-${$dropdownContent.is(":hidden") ? "down" : "up"}`);
            });
        }
    });

    const $dropdownStatus = $("<i>", { class: "sidenav-dropdown-icon fa-solid fa-chevron-down fa-xs" });
    $sidenavItem.append(["Services ", $dropdownStatus]);

    $sidenavMenu.append($sidenavItem);

    // Create services dropdown item
    const $sidenavDropdownContent = $("<div>", { class: "sidenav-dropdown-content" });

    $.map(services, service => {
        const $sidenavLink = $("<a>", {
            class: "sidenav-link dropdown",
            href: service.href,
            text: service.text,
        });
        $sidenavDropdownContent.append($sidenavLink);
    });

    $sidenavItem.append($sidenavDropdownContent);

    $sidenavMenu.append($sidenavItem);

    // Create sidenav items
    $.map(navLinks, navLink => {
        const $sidenavItemLink = $("<a>", { href: navLink.href });

        const $sidenavItem = $("<li>", {
            class: "sidenav-item",
            text: navLink.text,
        });

        $sidenavItemLink.append($sidenavItem);

        $sidenavMenu.append($sidenavItemLink);
    });

    $sidenav.append($sidenavMenu);
}

/**
 * Create the footer element
 */
function createFooter() {
    const $footer = $("#footer");

    const $footerContainer = $("<div>", { class: "footer-container" });

    // Services column
    const $servicesColumn = $("<div>", { class: "footer-column" });
    const $servicesTitle = $("<h4>", { text: "Services" });

    $servicesColumn.append($servicesTitle);

    const $servicesList = $("<ul>");

    $.map(services, service => {
        const $footerColumn = $("<div>", { class: "footer-column" });

        const $serviceItem = $("<li>");
        const $serviceLink = $("<a>", {
            href: service.href,
            text: service.text,
        });

        $serviceItem.append($serviceLink);
        $footerColumn.append($serviceItem);
        $servicesList.append($footerColumn);
    });

    $servicesColumn.append($servicesList);
    $footerContainer.append($servicesColumn);

    // Nav links 
    $.map(navLinks, navLink => {
        const $navColumn = $("<div>", { class: "footer-column" });

        const $navTitle = $("<h4>");
        const $navLink = $("<a>", {
            href: navLink.href,
            text: navLink.text,
        });

        $navTitle.append($navLink);
        $navColumn.append($navTitle);
        $footerContainer.append($navColumn);
    });

    // Footer Brand
    const $brandSection = $("<div>", { class: "footer-brand" });

    const $brandLogoLink = $("<a>", { href: "/" });
    const $brandLogo = $("<img>", {
        src: "images/logo-white.PNG",
        alt: "logo",
    });

    $brandLogoLink.append($brandLogo);
    const $brandText = $("<p>", { text: "See the world from a new angle with our exceptional drone photography and videography services." });

    $brandSection.append([$brandLogoLink, $brandText]);
    $footerContainer.append($brandSection);

    // Social Section
    const $socialSection = $("<div>", { class: "footer-social " });

    $.map(socialLinks, socialLink => {
        const $socialLink = $("<a>", { href: socialLink.href });

        const $socialImg = $("<img>", {
            src: socialLink.src,
            alt: socialLink.alt,
        });

        $socialLink.append($socialImg);
        $socialSection.append($socialLink);
        $footerContainer.append($socialSection);
    });

    // Contact Section 
    const $contactSection = $("<div>", {
        class: "footer-contact",
        text: "Aidan Cox",
    });

    const $contactEmail = $("<p>");
    const $contactEmailLink = $("<a>", {
        href: "mailto:aidan_cox@uri.edu",
        text: "aidan_cox@uri.edu",
    });

    $contactEmail.append($contactEmailLink);
    $contactSection.append($contactEmail);

    $footerContainer.append($contactSection);

    $footer.append($footerContainer);
}
