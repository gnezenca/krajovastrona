// Funkcja do dynamicznego ładowania header.html
        async function loadHeader() {
            try {
                const response = await fetch('header.html');
                const text = await response.text();

                // Tworzymy tymczasowy element do parsowania HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text;

                // Wstawiamy sam nagłówek (bez tagów script na początku)
                const headerContent = tempDiv.querySelector('header');
                if (headerContent) {
                    document.getElementById('header-placeholder').appendChild(headerContent);
                }

                // Szukamy i wykonujemy skrypty z wstawionego HTML
                const scripts = tempDiv.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = oldScript.textContent;
                    document.body.appendChild(newScript);
                });

            } catch (error) {
                console.error('Błąd ładowania nagłówka:', error);
            }
        }

        // Ładujemy nagłówek po załadowaniu DOM
        document.addEventListener('DOMContentLoaded', loadHeader);
