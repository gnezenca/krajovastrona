const dictionary = {
            "Denmark": "Denmark - Dana",
            "Germany": "Germany - Germana".
            "Poland": "Poland - Gnezenland".
 };

        const polishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        function formatDefinition(definitionText) {
            const parts = definitionText.split(' - ');
            if (parts.length === 2) {
                return `<strong>${parts[0].trim()}</strong> - <em>${parts[1].trim()}</em>`;
            }
            return definitionText;
        }

        function displayWordsByLetter(letter = 'A') { // Domyślnie 'A'
            const wordListUl = document.getElementById('wordList');
            wordListUl.innerHTML = ''; // Wyczyść listę przed dodaniem

            const sortedWords = Object.keys(dictionary).sort();
            const filteredWords = sortedWords.filter(word => word.toLowerCase().startsWith(letter.toLowerCase()));

            if (filteredWords.length > 0) {
                filteredWords.forEach(key => {
                    const li = document.createElement('li');
                    li.innerHTML = formatDefinition(dictionary[key]);
                    wordListUl.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.innerHTML = `<em>Brak słów na literę "${letter}" w słowniku.</em>`;
                wordListUl.appendChild(li);
            }

            document.getElementById('allWordsList').style.display = 'block';
            document.getElementById('singleResult').style.display = 'none';

            // Zaznacz aktywną literę
            document.querySelectorAll('.alphabet-filter span').forEach(span => {
                span.classList.remove('active');
            });
            document.querySelector(`.alphabet-filter span[data-letter="${letter}"]`).classList.add('active');
        }

        function searchWord() {
            const searchInput = document.getElementById('searchInput');
            const singleResultDiv = document.getElementById('singleResult');
            const allWordsListDiv = document.getElementById('allWordsList');

            const searchTerm = searchInput.value.toLowerCase().trim();

            singleResultDiv.classList.remove('error');
            singleResultDiv.innerHTML = "";

            if (searchTerm === "") {
                // Jeśli pole wyszukiwania jest puste, wyświetl domyślnie słowa na "A"
                displayWordsByLetter('A');
                return;
            }

            allWordsListDiv.style.display = 'none';
            singleResultDiv.style.display = 'block';

            if (dictionary[searchTerm]) {
                singleResultDiv.innerHTML = formatDefinition(dictionary[searchTerm]);
            } else {
                singleResultDiv.innerHTML = `<em>Brak słowa "${searchTerm}" w słowniku.</em>`;
                singleResultDiv.classList.add('error');
            }
        }

        function resetView() {
            const searchInput = document.getElementById('searchInput');
            // Jeśli pole wyszukiwania jest puste, zresetuj widok do pełnej listy słów na aktywną literę (domyślnie 'A')
            if (searchInput.value.trim() === "") {
                const activeLetterSpan = document.querySelector('.alphabet-filter span.active');
                const activeLetter = activeLetterSpan ? activeLetterSpan.dataset.letter : 'A';
                displayWordsByLetter(activeLetter);
                document.getElementById('singleResult').innerHTML = ""; // Wyczyść poprzedni wynik wyszukiwania
            }
        }

        // Funkcja do inicjalizacji alfabetu
        function initializeAlphabetFilter() {
            const alphabetFilterDiv = document.getElementById('alphabetFilter');
            polishAlphabet.split('').forEach(letter => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.dataset.letter = letter; // Dodaj atrybut data-letter
                span.addEventListener('click', () => displayWordsByLetter(letter));
                alphabetFilterDiv.appendChild(span);
            });
        }

        // Wywołaj funkcje po załadowaniu strony
        window.onload = () => {
            initializeAlphabetFilter(); // Najpierw utwórz alfabet
            displayWordsByLetter('A'); // Następnie wyświetl słowa na "A"
            document.getElementById('searchInput').addEventListener('input', resetView); // Dodaj nasłuchiwanie na zmiany w polu input
        };
