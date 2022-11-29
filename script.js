const modal = document.querySelector('.modal-bg');
const button = document.querySelector('.add');
const modalScale = document.querySelector('.modal');
const bookshelf = document.querySelector('.bookshelf');
const statsPage = document.querySelector('.stats');

// Opens modal
button.addEventListener('click', () => {
    modal.style.display = 'block';
    modalScale.classList.add('scale');
    clearForm();
    document.getElementById('book-title').focus();
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && modal.style.display == 'none') {
        modal.style.display = 'block';
        modalScale.classList.add('scale');
        clearForm();
        document.getElementById('book-title').focus();
    }
    if (e.key == 'Escape' && modal.style.display == 'block') {
        clearForm();
        modal.style.display = 'none';
    }
})

// Closes modal
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};

function clearForm() {
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');
    const radio = document.getElementsByName('read');
    title.value = '';
    author.value = '';
    pages.value = '';
    radio.forEach(button => {
        button.checked = false;
    })
}

const toggle = document.querySelector('.stats-toggle');
toggle.addEventListener('click', () => {
    if (toggle.textContent == 'Stats') {
        toggle.textContent = 'Bookshelf'
        bookshelf.style.display = 'none';
        statsPage.style.display = 'block';
        getStats();
    } else if (toggle.textContent == 'Bookshelf') {
        toggle.textContent = 'Stats';
        statsPage.style.display = 'none';
        bookshelf.style.display = 'block'
        statsPage.innerHTML = ''; // Clear page
    }
})

function getStats() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('stats-wrapper')
    statsPage.append(wrapper);

    const bookTotal = document.createElement('div');
    bookTotal.innerHTML = `Books: <span class='stat-number'>${library.length}</span>`;
    wrapper.append(bookTotal);

    const booksRead = document.createElement('div');
    const readBooks = function() {
        const read = library.filter(book => book.read === 'yes');
        return read.length;
    }
    booksRead.innerHTML = `Read: <span class='stat-number'>${readBooks()}</span>`;
    wrapper.append(booksRead);

    const booksUnread = document.createElement('div');
    const unreadBooks = function() {
        const unread = library.filter(book => book.read === 'no');
        return unread.length;
    }
    booksUnread.innerHTML = `Unread: <span class='stat-number'>${unreadBooks()}</span>`;
    wrapper.append(booksUnread);

    const pagesRead = document.createElement('div');
    const totalPages = function() {
        const read = library.filter(book => book.read === 'yes');
        const pages = read.reduce((total, book) => {
            return total += Number(book.pages);
        }, 0);
        return pages;
    };
    pagesRead.innerHTML = `Total Pages Read: <span class='stat-number'>${totalPages()}</span>`
    wrapper.append(pagesRead);
};

const library = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary() {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const radio = document.getElementsByName('read');
    let readStatus = '';
    radio.forEach(radio => {
        if (radio.checked) readStatus = radio.value;
    });
    library.push(new Book(title, author, pages, readStatus));
    populate();
    clearForm();
}

function populate() {
    const books = document.querySelectorAll('.book');

    // Deletes books from DOM
    books.forEach(book => {
        bookshelf.removeChild(book); 
    });

    // Adds books to DOM
    library.forEach(book => { 
        const bk = document.createElement('div');
        bk.classList.add('book');
        bookshelf.appendChild(bk);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        bk.append(bookInfo);

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = book.title;
        bookInfo.appendChild(title);

        const author = document.createElement('span');
        author.classList.add('author');
        author.innerHTML = `<span class='by'>by</span> ${book.author}`;
        bookInfo.appendChild(author);

        const pages = document.createElement('div');
        pages.classList.add('pages');
        pages.textContent = `${book.pages} pages`;
        bookInfo.appendChild(pages);

        const wrapper = document.createElement('div');
        wrapper.classList.add('buttons-wrapper');
        bk.appendChild(wrapper);

        const read = document.createElement('button');
        read.classList.add('book-buttons');
        read.classList.add('read-status');
        if (book.read == 'yes') {
            read.classList.add('read');
            read.textContent = 'Read';
        } else {
            read.classList.add('unread');
            read.textContent = 'Unread';
        }
        wrapper.appendChild(read);

        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.classList.add('book-buttons')
        remove.textContent = 'Remove';
        wrapper.appendChild(remove);
        remove.addEventListener('click', (e) => removeBook(e));
    });

    changeReadStatus(); // Adds listeners for Read Status
}

function changeReadStatus () {
    const readStatus = document.querySelectorAll('.read-status');

    readStatus.forEach(book => {
        // Change Read Status
        book.addEventListener('click', (e) => {
            const title = e.target.parentNode.parentNode.firstChild.innerHTML;
            if (e.target.classList.contains('read')) {
                e.target.classList.remove('read');
                e.target.classList.add('unread');
                e.target.textContent = 'Unread';
                for (let i = 0; i < library.length; i++) {
                    if (library[i].title === title) {
                        library[i].read = 'no';
                    }
                }
                return;
            }
            e.target.classList.remove('unread');
            e.target.classList.add('read');
            e.target.textContent = 'Read';
            for (let i = 0; i < library.length; i++) { 
                if (library[i].title === title) {
                    library[i].read = 'yes';
                }
            }
        });

        // Preview new Read Status on hover
        book.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('read')) {
                e.target.textContent = 'Unread';
                return;
            }
            e.target.textContent = 'Read';
        });

        // Revert preview
        book.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('read')) {
                e.target.textContent = 'Read';
                return;
            }
            e.target.textContent = 'Unread';
        });
    });
}

function removeBook(e) {
    const thisBook = e.target.parentNode.parentNode;
    const title = thisBook.firstChild.innerHTML;

    // Removes book from DOM
    thisBook.parentNode.removeChild(thisBook);

    //Removes book from library array
    for (let i = library.length - 1; i >= 0; i--) {
        if (library[i].title === title) {
            library.splice(i, 1);
        }
    }
}

// Submit form and add book
const submitBook = document.querySelector('.submit-book');
submitBook.addEventListener('click', (e) => {
    e.preventDefault();

    const length = library.length; // Get value

    const form = document.querySelector('form');
    let validity = form.reportValidity();

    if (validity) {
        addBookToLibrary();

        // Checks value and closes modal
        if (library.length > length) {
            modal.style.display = 'none';
        }
    }
    
});