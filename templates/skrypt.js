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

// https://gnezenca.github.io/krajovastrona/templates/skrypt.js
// (Dodaj lub zmodyfikuj poniższe w swoim istniejącym skrypcie.js)

// ... (Twój istniejący kod dla translations, navElement, langButtons) ...

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

const navElement = document.getElementById('main-nav');
const langButtons = document.querySelectorAll('.lang-button');
const languageTexts = document.querySelectorAll('.language-text'); // NOWA ZMIENNA: Pobierz wszystkie elementy tekstowe

function updateNavigation(lang) {
    const currentTranslations = translations[lang];

    // Zaktualizuj nawigację (jak już masz)
    if (navElement) { // Sprawdź, czy navElement istnieje, jeśli jest ładowany dynamicznie
        navElement.innerHTML = `
            <button class="nav-button"><a href="index.html">${currentTranslations.home}</a></button>
            <button class="nav-button"><a href="o-nas.html">${currentTranslations.about}</a></button>
            <button class="nav-button"><a href="kraj.html">${currentTranslations.country}</a></button>
            <button class="nav-button"><a href="narod.html">${currentTranslations.nation}</a></button>
            <button class="nav-button"><a href="mova.html">${currentTranslations.language}</a></button>
        `;
    }

    // NOWA LOGIKA: Zaktualizuj widoczność treści na stronie
    languageTexts.forEach(textElement => {
        if (textElement.dataset.lang === lang) {
            textElement.classList.add('active'); // Pokaż element dla wybranego języka
        } else {
            textElement.classList.remove('active'); // Ukryj pozostałe elementy
        }
    });
}

// ... (Pozostały kod do ładowania nagłówka i stopki, jeśli jest) ...

// Upewnij się, że ta część jest wywoływana po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    // Jeśli ładujesz nagłówek dynamicznie (np. za pomocą fetch),
    // upewnij się, że updateNavigation('gnz') jest wywoływana PO wstawieniu nagłówka.
    // Jeśli nagłówek jest statyczny w HTML, to wystarczy tutaj.

    // Przykład dla statycznego nagłówka (jeśli nie ładujesz go przez JS fetch):
    updateNavigation('gnz');

    // Obsługa kliknięć przycisków językowych (jak już masz)
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            updateNavigation(lang);
        });
    });
});
