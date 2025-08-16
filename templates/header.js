// Funkcja do ładowania i wstawiania zawartości pliku HTML
        async function loadHeader() {
            try {
                const response = await fetch('https://gnezenca.github.io/krajovastrona/templatesheader.html'); // Ścieżka do pliku header.html
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                const headerContent = await response.text();
                document.getElementById('header-placeholder').innerHTML = headerContent;

                // Ponowne uruchomienie skryptów po wstawieniu dynamicznej zawartości
                // Jest to kluczowe, ponieważ skrypty wstawione przez innerHTML nie są automatycznie wykonywane
                const scriptElement = document.getElementById('header-placeholder').querySelector('script');
                if (scriptElement) {
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptElement.textContent;
                    document.body.appendChild(newScript); // Dodaj skrypt do body, aby został wykonany
                    scriptElement.remove(); // Opcjonalnie usuń stary element script, jeśli nie jest potrzebny
                }

            } catch (error) {
                console.error('Nie udało się załadować headera:', error);
            }
        }

        // Wywołaj funkcję po załadowaniu DOM
        document.addEventListener('DOMContentLoaded', loadHeader);
    </script>
