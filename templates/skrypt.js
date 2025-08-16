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
