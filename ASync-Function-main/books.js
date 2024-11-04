const searchForm = document.getElementById('searchForm');
const bookInput = document.getElementById('bookInput');
const loadingMessage = document.getElementById('loadingMessage');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();  
    const bookName = bookInput.value.trim();
    if (bookName) {
        searchBooks(bookName);
    }
});

async function searchBooks(bookName) {
    loadingMessage.style.display = 'block';
    resultsTable.style.display = 'none';

    try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${bookName.replace(/ /g, '+')}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        displayResults(data.docs);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function displayResults(books) {
    resultsBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');

        titleCell.textContent = book.title;
        authorCell.textContent = book.author_name ? book.author_name.join(', ') : 'Unknown';

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        resultsBody.appendChild(row);
    });

    resultsTable.style.display = 'table';
}
