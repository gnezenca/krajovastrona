// header_script.js
const translations = {
    gnz: {
        home: "HLOVNA STRONA",
        about: "O NAS",
        country: "KRAJ",
        nation: "NAROD",
        language: "MOVA"
    },
    pol: {
        home: "STRONA GŁÓWNA",
        about: "O NAS",
        country: "KRAJ",
        nation: "NARÓD",
        language: "JĘZYK"
    },
    eng: {
        home: "HOME PAGE",
        about: "ABOUT US",
        country: "COUNTRY",
        nation: "NATION",
        language: "LANGUAGE"
    }
};

function updateNavigation(lang) {
    const navElement = document.getElementById('main-nav');
    if (!navElement) return; // Upewnij się, że element istnieje

    const currentTranslations = translations[lang];
    navElement.innerHTML = `
        <button class="nav-button"><a href="index.html">${currentTranslations.home}</a></button>
        <button class="nav-button"><a href="o-nas.html">${currentTranslations.about}</a></button>
        <button class="nav-button"><a href="kraj.html">${currentTranslations.country}</a></button>
        <button class="nav-button"><a href="narod.html">${currentTranslations.nation}</a></button>
        <button class="nav-button"><a href="mova.html">${currentTranslations.language}</a></button>
    `;
}

// Funkcja do wczytywania nagłówka
async function loadHeader() {
    try {
        const response = await fetch('header.html'); // Ścieżka do pliku header.html
        const headerHtml = await response.text();
        const headerContainer = document.getElementById('header-placeholder'); // Kontener, gdzie wstawisz nagłówek
        if (headerContainer) {
            headerContainer.innerHTML = headerHtml;
        }

        // Po wstawieniu HTML, zainicjuj funkcjonalność JavaScript
        const langButtons = document.querySelectorAll('.lang-button');

        // Ustawienie domyślnego języka na Gnezensky po załadowaniu nagłówka
        updateNavigation('gnz');

        // Obsługa kliknięć przycisków językowych
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.dataset.lang;
                updateNavigation(lang);
            });
        });

    } catch (error) {
        console.error('Błąd podczas wczytywania nagłówka:', error);
    }
}

// Wywołaj funkcję wczytywania nagłówka po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadHeader);
