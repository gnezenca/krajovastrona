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

    const navButtons = document.querySelectorAll('.header-nav .nav-button');
    const langButtons = document.querySelectorAll('.language-switcher .lang-button');

    function setLanguage(lang) {
        navButtons.forEach(button => {
            const langKey = button.dataset.langKey;
            if (langKey && translations[lang] && translations[lang][langKey]) {
                button.querySelector('a').textContent = translations[lang][langKey];
            }
        });

        langButtons.forEach(button => {
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            setLanguage(selectedLang);
        });
    });

    // Ustaw język domyślny na GNZ po załadowaniu strony
    document.addEventListener('DOMContentLoaded', () => {
        setLanguage('gnz');
    });
