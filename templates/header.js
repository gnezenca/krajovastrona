fetch('https://gnezenca.github.io/krajovastrona/templates/header.html') // Zastąp 'header.html' ścieżką do Twojego pliku z nagłówkiem
            .then(response => response.text())
            .then(html => {
                document.getElementById('header-placeholder').innerHTML = html;
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas ładowania nagłówka:', error);
            });
