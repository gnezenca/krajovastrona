// Obiekt przechowujący tłumaczenia dla różnych elementów
    const translations = {
        gnz: {
            greeting: "Fitai",
            "main-page": "HLAVNA STRONA",
            "about-us": "O NAS",
            "country": "KRAJ",
            "nation": "NAROD",
            "language": "MOVA"
        },
        pol: {
            greeting: "Witaj",
            "main-page": "STRONA GŁÓWNA",
            "about-us": "O NAS",
            "country": "KRAJ",
            "nation": "NARÓD",
            "language": "JĘZYK"
        },
        eng: {
            greeting: "Welcome",
            "main-page": "MAIN PAGE",
            "about-us": "ABOUT US",
            "country": "COUNTRY",
            "nation": "NATION",
            "language": "LANGUAGE"
        }
    };

    // Funkcja do zmiany języka
    function setLanguage(lang) {
        // Zmiana tekstu nagłówka H1
        document.querySelectorAll('.greeting-text').forEach(greeting => {
            greeting.classList.remove('active');
        });
        const activeGreeting = document.querySelector(`.greeting-text[data-lang="${lang}"]`);
        if (activeGreeting) {
            activeGreeting.classList.add('active');
        }

        // Zmiana tekstu w przyciskach nawigacyjnych
        const currentTranslations = translations[lang];
        if (currentTranslations) {
            document.querySelectorAll('.nav-button').forEach(button => {
                const key = button.getAttribute('data-key');
                if (key && currentTranslations[key]) {
                    // Aktualizujemy tekst wewnątrz elementu <a> w przycisku
                    const linkElement = button.querySelector('a');
                    if (linkElement) {
                        linkElement.textContent = currentTranslations[key];
                    }
                }
            });
        }
        // Możesz dodać więcej elementów do tłumaczenia tutaj
    }

    // Dodaj słuchacze zdarzeń do przycisków językowych
    document.querySelectorAll('.lang-button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Ustaw domyślny język po załadowaniu strony
    setLanguage('gnz'); // Ustawia język GNZ jako domyślny na start

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
                "language": "MOVA"
            },
            pol: {
                "main-page": "STRONA GŁÓWNA",
                "about-us": "O NAS",
                "country": "KRAJ",
                "nation": "NARÓD",
                "language": "JĘZYK"
            },
            eng: {
                "main-page": "MAIN PAGE",
                "about-us": "ABOUT US",
                "country": "COUNTRY",
                "nation": "NATION",
                "language": "LANGUAGE"
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
