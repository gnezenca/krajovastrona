fetch('https://gnezenca.github.io/krajovastrona/templatesheader.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            })
            .catch(error => console.error('Błąd ładowania nagłówka:', error));
