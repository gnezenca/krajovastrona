        const translations = {
            gnz: {
                "main-page": "HLOVNA STRONA",
                "about-us": "O NAS",
                "symbols": "SYMBOLY",
                "history": "ISTORA",
                "g-zloty": "GNEZENSKY ZLOTY",
                "partners": "PARTNERY",
                "constitution": "KONSTYTUCA",
                "news": "VESTY",
                "language": "MOVA",
                "grammar": "HRAMATYKA",
                "dictionary": "SLOVOZBOR",
                "forum": "FORUM",
                "institutions": "INSTYTUCY",
                "gta": "GNEZENSKA TEHNOLOGOVA AKADEMA",
                "g-school": "GNEZENSKA MOKYKLA",
                "g-library": "GNEZENSKA BIBLOTEKA",
                "g-telegraph": "GNEZENSKY TELEGRAF",
                "gnezenpeda": "GNEZENPEDA",
            },
            pol: {
                "main-page": "STRONA GŁÓWNA",
                "about-us": "O NAS",
                "history": "HISTORIA",
                "symbols": "SYMBOLE",
                "g-zloty": "ZŁOTY GNEŻEŃSKI",
                "partners": "PARTNERZY",
                "constitution": "KONSTYTUCJA",
                "news": "WIADOMOŚCI",
                "language": "JĘZYK",
                "grammar": "GRAMATYKA",
                "dictionary": "SŁOWNIK",
                "forum": "FORUM",
                "institutions": "INSTYTUCJE",
                "gta": "GNEŻEŃSKA AKADEMIA TECHNOLOGICZNA",
                "g-school": "SZKOŁA GNEŻEŃSKA",
                "g-library": "BIBLIOTEKA GNEŻEŃSKA",
                "g-telegraph": "TELEGRAF GNEŻEŃSKI",
                "gnezenpeda": "GNEZENPEDA",
            },
            eng: {
                "main-page": "MAIN PAGE",
                "about-us": "ABOUT US",
                "history": "HISTORY",
                "symbols": "SYMBOLS",
                "g-zloty": "GNEZEN ZLOTY",
                "partners": "PARTNERS",
                "constitution": "CONSTITUTION",
                "news": "NEWS",
                "language": "LANGUAGE",
                "grammar": "GRAMMAR",
                "dictionary": "DICTIONARY",
                "forum": "FORUM",
                "institutions": "INSTITUTIONS",
                "gta": "GNEZEN TECHNOLOGICAL ACADEMY",
                "g-school": "GNEZEN SCHOOL",
                "g-library": "GNEZEN LIBRARY",
                "g-telegraph": "GNEZEN TELEGRAPH",
                "gnezenpeda": "GNEZENPEDA",
            }
        };

        function setLanguage(lang) {
            document.querySelectorAll('.greeting-text').forEach(el => {
                el.style.display = 'none';
            });
            const activeGreeting = document.querySelector(`.greeting-text[data-lang="${lang}"]`);
            if (activeGreeting) {
                activeGreeting.style.display = 'block';
            }
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

        function initializeLanguageSwitcher() {
            document.querySelectorAll('.lang-button').forEach(button => {
                button.addEventListener('click', () => {
                    const lang = button.getAttribute('data-lang');
                    setLanguage(lang);
                });
            });
            setLanguage('gnz');
        }

        function startClock() {
            const BASE_TZ = 'Europe/Warsaw';
            const DISPLAY_OFFSET_MS = 60 * 60 * 1000;
            const RESYNC_INTERVAL_MS = 60 * 1000;
            const timeFmt = new Intl.DateTimeFormat('pl-PL', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false, timeZone: BASE_TZ
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

        function initializeDropdowns() {
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                const dropdownContent = toggle.nextElementSibling;
                if (!dropdownContent || !dropdownContent.classList.contains('dropdown-content')) return;
                toggle.addEventListener('click', (event) => {
                    event.stopPropagation();
                    document.querySelectorAll('.dropdown-content').forEach(content => {
                        if (content !== dropdownContent) {
                            content.style.display = 'none';
                        }
                    });
                    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                });
            });
            window.addEventListener('click', () => {
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.display = 'none';
                });
            });
        }

        // Nowa funkcja do ładowania stopki
        async function loadFooter() {
            try {
                const response = await fetch('https://gnezenca.github.io/krajovastrona/templates/footer.html');
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                const footerHtml = await response.text();
                document.getElementById('footer-placeholder').innerHTML = footerHtml;
            } catch (error) {
                console.error('Nie udało się wczytać stopki:', error);
            }
        }

        // Główna funkcja ładująca wszystko
        async function loadAllContent() {
            try {
                // KROK 1: Wczytanie i wstawienie nagłówka
                const headerResponse = await fetch('https://gnezenca.github.io/krajovastrona/templates/header.html');
                if (!headerResponse.ok) {
                    throw new Error(`Błąd HTTP: ${headerResponse.status}`);
                }
                const headerHtml = await headerResponse.text();
                document.getElementById('header-placeholder').innerHTML = headerHtml;

                // KROK 2: Inicjalizuj skrypty po załadowaniu nagłówka
                initializeLanguageSwitcher();
                startClock();
                initializeDropdowns();

                // KROK 3: Wczytanie i wstawienie stopki
                await loadFooter();

            } catch (error) {
                console.error('Nie udało się wczytać zawartości:', error);
            }
        }
        
        document.addEventListener('DOMContentLoaded', loadAllContent);
