       // Funkcja do ładowania zawartości z pliku
        function loadContent(url, elementId) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Błąd HTTP! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    document.getElementById(elementId).innerHTML = html;
                })
                .catch(error => {
                    console.error(`Wystąpił błąd podczas ładowania ${url}:`, error);
                });
        }

        // Załaduj nagłówek (jeśli masz plik header.html)
        // loadContent('header.html', 'header-placeholder');

        // Załaduj stopkę
        loadContent('https://gnezenca.github.io/krajovastrona/templates/footer.html', 'footer-placeholder');
        fetch('https://gnezenca.github.io/krajovastrona/templates/header.html') // Zastąp 'header.html' ścieżką do Twojego pliku z nagłówkiem
            .then(response => response.text())
            .then(html => {
                document.getElementById('header-placeholder').innerHTML = html;
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas ładowania nagłówka:', error);
            });
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
