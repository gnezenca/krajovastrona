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
        // Funkcja do ładowania nagłówka
        async function loadHeader() {
            try {
                const response = await fetch('https://gnezenca.github.io/krajovastrona/templates/header.html');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const headerHtml = await response.text();
                document.getElementById('header-placeholder').innerHTML = headerHtml;
                // Po załadowaniu nagłówka, inicjalizujemy słuchacze zdarzeń
                initializeLanguageSwitcher();
            } catch (error) {
                console.error('Błąd podczas ładowania nagłówka:', error);
            }
        }

        // Obiekt przechowujący tłumaczenia dla różnych elementów
        const translations = {
            gnz: {
                "main-page": "HLOVNA STRONA",
                "about-us": "O NAS",
                "country": "KRAJ",
                "nation": "NAROD",
                "language": "MOVA",
                "grammar": "HRAMATYKA",
                "dictionary": "SLOVOZBOR"
            },
            pol: {
                "main-page": "STRONA GŁÓWNA",
                "about-us": "O NAS",
                "country": "KRAJ",
                "nation": "NARÓD",
                "language": "JĘZYK",
                "grammar": "GRAMATYKA",
                "dictionary": "SŁOWNIK"
            },
            eng: {
                "main-page": "MAIN PAGE",
                "about-us": "ABOUT US",
                "country": "COUNTRY",
                "nation": "NATION",
                "language": "LANGUAGE",
                "grammar": "GRAMMAR",
                "dictionary": "DICTIONARY"
            }
        };

        // Funkcja do zmiany języka
        function setLanguage(lang) {
            // Zmiana tekstu powitania H1 (znajduje się w 1.html)
            document.querySelectorAll('.greeting-text').forEach(greeting => {
                greeting.classList.remove('active');
            });
            const activeGreeting = document.querySelector(`.greeting-text[data-lang="${lang}"]`);
            if (activeGreeting) {
                activeGreeting.classList.add('active');
            }

            // Zmiana tekstu w przyciskach nawigacyjnych (znajduje się w załadowanym nagłówku)
            const currentTranslations = translations[lang];
            if (currentTranslations) {
                document.querySelectorAll('.nav-button').forEach(button => {
                    const key = button.getAttribute('data-key');
                    if (key && currentTranslations[key]) {
                        const linkElement = button.querySelector('a');
                        if (linkElement) {
                            linkElement.textContent = currentTranslations[key];
                        }
                    }
                });
            }
        }

        // Funkcja inicjalizująca słuchacze zdarzeń dla przełączników języka
        function initializeLanguageSwitcher() {
            document.querySelectorAll('.lang-button').forEach(button => {
                button.addEventListener('click', () => {
                    const lang = button.getAttribute('data-lang');
                    setLanguage(lang);
                });
            });
            // Ustaw domyślny język po załadowaniu nagłówka i inicjalizacji przełączników
            setLanguage('gnz'); // Ustawia język GNZ jako domyślny na start
        }

        // Ładuj nagłówek po załadowaniu DOM
        document.addEventListener('DOMContentLoaded', loadHeader);
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdown = document.querySelector('.dropdown');

    // Pokazuj/ukrywaj menu po kliknięciu na przycisk "MOVA"
    dropdownToggle.addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Zamykaj menu, jeśli kliknięto poza nim
    window.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    // Alternatywnie, dla działania na hover (jak w CSS), możesz usunąć powyższy JS
    // i polegać wyłącznie na CSS. Jeśli chcesz oba, to możesz tak zostawić.
    // Powyższy JS daje kontrolę nad otwieraniem/zamykaniem kliknięciem.
});
