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
// Istniejące tłumaczenia dla nawigacji
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
    const greetingTexts = document.querySelectorAll('.greeting-text'); // Nowa zmienna dla powitań

    function updateNavigation(lang) {
        const currentTranslations = translations[lang];
        navElement.innerHTML = `
            <button class="nav-button"><a href="index.html">${currentTranslations.home}</a></button>
            <button class="nav-button"><a href="o-nas.html">${currentTranslations.about}</a></button>
            <button class="nav-button"><a href="kraj.html">${currentTranslations.country}</a></button>
            <button class="nav-button"><a href="narod.html">${currentTranslations.nation}</a></button>
            <button class="nav-button"><a href="mova.html">${currentTranslations.language}</a></button>
        `;

        // Funkcja do aktualizacji widocznego powitania (dodana tutaj)
        greetingTexts.forEach(textElement => {
            textElement.classList.remove('active');
        });

        const selectedGreeting = document.querySelector(`#greeting-container .greeting-text[data-lang="${lang}"]`);
        if (selectedGreeting) {
            selectedGreeting.classList.add('active');
        }
    }

    // Ustawienie domyślnego języka na Gnezensky po załadowaniu strony
    document.addEventListener('DOMContentLoaded', () => {
        updateNavigation('gnz'); // Wywoła to również aktualizację powitania
    });

    // Obsługa kliknięć przycisków językowych
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            updateNavigation(lang);
        });
    });
