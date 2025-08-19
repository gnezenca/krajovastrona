const dictionary = {
    "a": "a - a",
    "abdias": "Abdias - Abdaš",
    "graduate": "graduate - absolvent",
    "adam": "Adam - Adam",
};

const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Changed to English alphabet

function formatDefinition(definitionText) {
    const parts = definitionText.split(' - ');
    if (parts.length === 2) {
        return `<strong>${parts[0].trim()}</strong> - <em>${parts[1].trim()}</em>`;
    }
    return definitionText;
}

function displayWordsByLetter(letter = 'A') { // Default to 'A'
    const wordListUl = document.getElementById('wordList');
    wordListUl.innerHTML = ''; // Clear list before adding

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
        li.innerHTML = `<em>No words starting with "${letter}" in the dictionary.</em>`; // Translated message
        wordListUl.appendChild(li);
    }

    document.getElementById('allWordsList').style.display = 'block';
    document.getElementById('singleResult').style.display = 'none';

    // Mark active letter
    document.querySelectorAll('.alphabet-filter.en span').forEach(span => {
        span.classList.remove('active');
    });
    const activeLetterElement = document.querySelector(`.alphabet-filter.en span[data-letter="${letter}"]`);
    if (activeLetterElement) {
        activeLetterElement.classList.add('active');
    }
}

function searchWord() {
    const searchInput = document.getElementById('searchInput');
    const singleResultDiv = document.getElementById('singleResult');
    const allWordsListDiv = document.getElementById('allWordsList');

    const searchTerm = searchInput.value.toLowerCase().trim();

    singleResultDiv.classList.remove('error');
    singleResultDiv.innerHTML = "";

    if (searchTerm === "") {
        // If search input is empty, display words starting with 'A' by default
        displayWordsByLetter('A');
        return;
    }

    allWordsListDiv.style.display = 'none';
    singleResultDiv.style.display = 'block';

    if (dictionary[searchTerm]) {
        singleResultDiv.innerHTML = formatDefinition(dictionary[searchTerm]);
    } else {
        singleResultDiv.innerHTML = `<em>Word "${searchTerm}" not found in the dictionary.</em>`; // Translated message
        singleResultDiv.classList.add('error');
    }
}

function resetView() {
    const searchInput = document.getElementById('searchInput');
    // If search input is empty, reset view to full list of words starting with active letter (default 'A')
    if (searchInput.value.trim() === "") {
        const activeLetterSpan = document.querySelector('.alphabet-filter span.active');
        const activeLetter = activeLetterSpan ? activeLetterSpan.dataset.letter : 'A';
        displayWordsByLetter(activeLetter);
        document.getElementById('singleResult').innerHTML = ""; // Clear previous search result
    }
}

// Function to initialize alphabet
function initializeAlphabetFilter() {
    const alphabetFilterDiv = document.getElementById('alphabetFilter');
    // Use the English alphabet for this version
    englishAlphabet.split('').forEach(letter => { // Changed from polishAlphabet to englishAlphabet
        const span = document.createElement('span');
        span.textContent = letter;
        span.dataset.letter = letter; // Add data-letter attribute
        span.addEventListener('click', () => displayWordsByLetter(letter));
        alphabetFilterDiv.appendChild(span);
    });
}

// Call functions after page load
window.onload = () => {
    initializeAlphabetFilter(); // First create the alphabet
    displayWordsByLetter('A'); // Then display words starting with 'A'
    document.getElementById('searchInput').addEventListener('input', resetView); // Add listener for input changes
};
