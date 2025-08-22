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
                "history": "ISTORA",
                "country": "KRAJ",
                "nation": "NAROD",
                "language": "MOVA",
                "grammar": "HRAMATYKA",
                "dictionary": "SLOVOZBOR",
            },
            pol: {
                "main-page": "STRONA GŁÓWNA",
                "about-us": "O NAS",
               "history": "HISTORIA",
                "country": "KRAJ",
                "nation": "NARÓD",
                "language": "JĘZYK",
                "grammar": "GRAMATYKA",
                "dictionary": "SŁOWNIK",
            },
            eng: {
                "main-page": "MAIN PAGE",
                "about-us": "ABOUT US",
                   "history": "HISTORY",
                "country": "COUNTRY",
                "nation": "NATION",
                "language": "LANGUAGE",
                "grammar": "GRAMMAR",
                "dictionary": "DICTIONARY",
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
    const BASE_TZ = 'Europe/Warsaw';  // Strefa bazowa: Polska
    const DISPLAY_OFFSET_MS = 60 * 60 * 1000; // Dodajemy +1 godzinę
    const RESYNC_INTERVAL_MS = 60 * 1000; // Synchronizacja co 1 minutę

    // Formatter do wyświetlania daty i godziny
    const timeFmt = new Intl.DateTimeFormat('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: BASE_TZ
    });

    const clockEl = document.getElementById('clock');
    let baseServerEpochMs = null;
    let basePerfMs = null;
    let resyncTimer = null;

    // Pobiera czas z worldtimeapi.org
    async function fetchWarsawTime() {
      const r = await fetch('https://worldtimeapi.org/api/timezone/' + BASE_TZ, { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const data = await r.json();
      return new Date(data.datetime).getTime();
    }

    async function syncNow() {
      try {
        const warsawEpoch = await fetchWarsawTime();
        baseServerEpochMs = warsawEpoch + DISPLAY_OFFSET_MS; // Dodajemy +1h
        basePerfMs = performance.now();
      } catch (e) {
        clockEl.textContent = 'Błąd pobierania czasu';
      }
    }

    function tick() {
      if (baseServerEpochMs != null && basePerfMs != null) {
        const elapsed = performance.now() - basePerfMs;
        const currentEpoch = baseServerEpochMs + elapsed;
        const displayStr = timeFmt.format(new Date(currentEpoch));
        clockEl.textContent = displayStr;
      }
      requestAnimationFrame(tick);
    }

    function setupResync() {
      if (resyncTimer) clearInterval(resyncTimer);
      resyncTimer = setInterval(syncNow, RESYNC_INTERVAL_MS);
    }

    // Start
    (async () => {
      await syncNow();
      setupResync();
      tick();
    })();
