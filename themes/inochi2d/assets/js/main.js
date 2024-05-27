
window.addEventListener("click", (ev) => {

    const navToggleBtn = ev.target.closest("#js-site-nav-toggle"),
          menuClosest = ev.target.closest("#js-site-nav-menu");

    if (navToggleBtn) {
        const menu = document.getElementById("js-site-nav-menu"),
              state = navToggleBtn.getAttribute("aria-expanded") === "true";

        if (state) {
            menu.classList.remove("is-open");
        } else {
            menu.classList.add("is-open");
        }

        navToggleBtn.setAttribute("aria-expanded", !state);
    } else {

        if (menuClosest)
            return;

        document.getElementById("js-site-nav-menu").classList.remove("is-open");
        document.getElementById("js-site-nav-toggle").setAttribute("aria-expanded", false);

    }

});

if (document.getElementById("gallery-slider")) {

    const swiper = new Swiper('.gallery-slider', {
        spaceBetween: 32,
        direction: 'horizontal',
        wrapperClass: 'gallery-slider__container',
        slideClass: 'gallery-slider__slide',
        pagination: {
            bulletClass: 'gallery-slider__bullet',
            clickable: true,
            el: '.gallery-slider__pagination',
        },
        navigation: {
            nextEl: '.gallery-slider__next',
            prevEl: '.gallery-slider__prev',
        },

      });

}

const cards = document.querySelector(".js-cards");

function cardResizeHandler() {

    if (cards) {

        const cardBodies = cards.getElementsByClassName("js-card-body");
    
        let maxCardBodyHeight = null;

        if (window.innerWidth >= 640) {

            maxCardBodyHeight = 0;
        
            for (let i = 0; i < cardBodies.length; i++) {
                const cardBody = cardBodies[i],
                    cardBodyHeight = cardBody.offsetHeight;
        
                if (maxCardBodyHeight < cardBodyHeight) {
                    maxCardBodyHeight = cardBodyHeight;
                }
            }

        }
    
        for (let i = 0; i < cardBodies.length; i++) {
            cardBodies[i].style.height = `${maxCardBodyHeight}px`;
        }
    
    }

}

if (cards) {

    window.addEventListener("resize", () => {
        requestAnimationFrame(cardResizeHandler);
    });

    window.addEventListener("load", () => {
        requestAnimationFrame(cardResizeHandler);
    });

}

function checkOS() {

    const htmlEl = document.getElementsByTagName("HTML")[0];

    let platform = navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform;

    switch(platform.toLowerCase()) {
        case "win32":
        case "win64":
        case "windows":
            htmlEl.classList.add("is-windows");
            return "windows";
        case "macos":
        case "macintel":
            htmlEl.classList.add("is-macos");
            return "mac";
        case "iphone":
        case "ipad":
            htmlEl.classList.add("is-ios");
            return "ios";
        case "linux":
        case "linux x86_64":
        case "wayland":
        case "x11":
            htmlEl.classList.add("is-linux");
            return "linux";
        default:
            return "unknown";
    }

}

checkOS();

const downloadCards = document.getElementsByClassName("js-download-card");

for (let i = 0; i < downloadCards.length; i++) {

    const card = downloadCards[i],
          mainDownloadsEl = card.querySelector(".card__body-container  .card__footer"),
          targetButton = card.querySelector(".js-os-download"),
          availableDownloads = card.querySelector(".js-os-downloads");

    let specifiedDownload = availableDownloads.querySelector(`.js-${ checkOS() }-download`);

    if (specifiedDownload) {

        let firstPrimary = false;

        if (mainDownloadsEl.children[0].classList.contains("button--primary")) {
            firstPrimary = true;
        }

        mainDownloadsEl.removeChild(mainDownloadsEl.children[0]);
        mainDownloadsEl.insertBefore(specifiedDownload, mainDownloadsEl.children[0]);

        if (firstPrimary) {
            mainDownloadsEl.children[0].classList.add("button--primary");
        }

    }

}
