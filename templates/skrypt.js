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

        // Funkcja inicjalizująca przełączniki języka
        function initializeLanguageSwitcher() {
            document.querySelectorAll('.lang-button').forEach(button => {
                button.addEventListener('click', () => {
                    const lang = button.getAttribute('data-lang');
                    setLanguage(lang);
                });
            });
            // Ustaw domyślny język po załadowaniu
            setLanguage('gnz');
        }
        
        // Funkcja inicjalizująca zegar
        function startClock() {
            const BASE_TZ = 'Europe/Warsaw';
            const DISPLAY_OFFSET_MS = 60 * 60 * 1000;
            const RESYNC_INTERVAL_MS = 60 * 1000;

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
            if (!clockEl) {
                console.error("Element 'clock' nie został znaleziony.");
                return;
            }

            let baseServerEpochMs = null;
            let basePerfMs = null;
            let resyncTimer = null;

            async function fetchWarsawTime() {
                const r = await fetch('https://worldtimeapi.org/api/timezone/' + BASE_TZ, { cache: 'no-store' });
                if (!r.ok) throw new Error('HTTP ' + r.status);
                const data = await r.json();
                return new Date(data.datetime).getTime();
            }

            async function syncNow() {
                try {
                    const warsawEpoch = await fetchWarsawTime();
                    baseServerEpochMs = warsawEpoch + DISPLAY_OFFSET_MS;
                    basePerfMs = performance.now();
                } catch (e) {
                    clockEl.textContent = 'ERROR';
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

            (async () => {
                await syncNow();
                setupResync();
                tick();
            })();
        }

        // Funkcja inicjalizująca menu rozwijane
        function initializeDropdown() {
            const dropdownToggle = document.querySelector('.dropdown-toggle[data-key="language"]');
            const dropdownContent = dropdownToggle.closest('.dropdown').querySelector('.dropdown-content');
            const dropdown = dropdownToggle.closest('.dropdown');
            
            if (!dropdownToggle || !dropdownContent) {
                console.error("Elementy menu rozwijanego 'language' nie zostały znalezione.");
                return;
            }

            // Pokazuj/ukrywaj menu po kliknięciu na przycisk "MOVA"
            dropdownToggle.addEventListener('click', function(event) {
                event.stopPropagation(); // Zapobiega natychmiastowemu zamknięciu przez "window.click"
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });

            // Zamykaj menu, jeśli kliknięto poza nim
            window.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });
        }

        // Główna funkcja ładująca wszystko
        async function loadAllContent() {
            try {
                // KROK 1: Wczytanie i wstawienie nagłówka
                const response = await fetch('https://gnezenca.github.io/krajovastrona/templates/header.html');
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                const headerHtml = await response.text();
                document.getElementById('header-placeholder').innerHTML = headerHtml;

                // KROK 2: Po załadowaniu nagłówka, inicjalizuj wszystkie skrypty
                initializeLanguageSwitcher();
                startClock();
                initializeDropdown();

            } catch (error) {
                console.error('Nie udało się wczytać zawartości:', error);
            }
        }
        
        // Rozpocznij cały proces po załadowaniu DOM
        document.addEventListener('DOMContentLoaded', loadAllContent);
