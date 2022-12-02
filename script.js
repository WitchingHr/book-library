const library = (function () {

    const _library = [];
    let libraryAPI = [];

    const modal = document.querySelector('.modal-bg');
    const button = document.querySelector('.add');
    const modalScale = document.querySelector('.modal');
    const bookshelf = document.querySelector('.bookshelf');
    const statsPage = document.querySelector('.stats');
    // Form:
    const form = document.querySelector('form');
    const formTitle = document.getElementById('book-title');
    const formAuthor = document.getElementById('book-author');
    const formPages = document.getElementById('book-pages');
    const formRadio = document.getElementsByName('read');
    const submit = document.querySelector('.submit-book');

    button.addEventListener('click', openModal);
    window.addEventListener('keydown', openCloseModalByKey);
    window.addEventListener('click', closeModal);
    submit.addEventListener('click', submitBook);

    function openModal() {
        modal.style.display = 'block';
        modalScale.classList.add('scale');
        clearForm();
        formTitle.focus();
    }

    function closeModal(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }

    function openCloseModalByKey(e) {
        if (e.key == 'Enter' && modal.style.display == 'none') {
            modal.style.display = 'block';
            modalScale.classList.add('scale');
            clearForm();
            formTitle.focus();
        }
        if (e.key == 'Escape' && modal.style.display == 'block') {
            clearForm();
            modal.style.display = 'none';
        }
    }

    function clearForm() {
        formTitle.value = '';
        formAuthor.value = '';
        formPages.value = '';
        formRadio.forEach(button => {
            button.checked = false;
        })
    }

    function Book(title, author, pages, read) {
        return {
            title,
            author,
            pages,
            read
        }
    }

    function addBookToLibrary() {
        const title = formTitle.value;
        const author = formAuthor.value;
        const pages = formPages.value;
        let readStatus = '';
        formRadio.forEach(radio => {
            if (radio.checked) readStatus = radio.value;
        });
        _library.push(Book(title, author, pages, readStatus));
        libraryAPI.push(Book(title, author, pages, readStatus));
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
        _library.forEach(book => { 
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
        });
        bindBookEvents();
    }

    function bindBookEvents() {
        const readStatus = document.querySelectorAll('.read-status');
        readStatus.forEach(book => {
            book.addEventListener('click', changeReadStatus);
            book.addEventListener('mouseover', previewReadStatus);
            book.addEventListener('mouseout', revertPreview);
        })
        const remove = document.querySelectorAll('.remove');
        remove.forEach(book => {
            book.addEventListener('click', removeBook);
        })
    }

    function changeReadStatus(e) {
        const title = e.target.parentNode.parentNode.firstChild.innerHTML;
        if (e.target.classList.contains('read')) {
            e.target.classList.remove('read');
            e.target.classList.add('unread');
            e.target.textContent = 'Unread';
            for (let i = 0; i < _library.length; i++) {
                if (_library[i].title === title) {
                    _library[i].read = 'no';
                }
            }
            return;
        }
        e.target.classList.remove('unread');
        e.target.classList.add('read');
        e.target.textContent = 'Read';
        for (let i = 0; i < _library.length; i++) { 
            if (_library[i].title === title) {
                _library[i].read = 'yes';
            }
        }
    }

    function previewReadStatus(e) {
        if (e.target.classList.contains('read')) {
            e.target.textContent = 'Unread';
            return;
        }
        e.target.textContent = 'Read';
    }

    function revertPreview(e) {
        if (e.target.classList.contains('read')) {
            e.target.textContent = 'Read';
            return;
        }
        e.target.textContent = 'Unread';
    }

    function removeBook(e) {
        const thisBook = e.target.parentNode.parentNode;
        const title = thisBook.firstChild.innerHTML;
        // Removes book from DOM
        thisBook.parentNode.removeChild(thisBook);
        //Removes book from library array
        for (let i = _library.length - 1; i >= 0; i--) {
            if (_library[i].title === title) {
                _library.splice(i, 1);
                libraryAPI.splice(i, 1);
            }
        }

    }

    function submitBook(e) {
        e.preventDefault();
        const length = _library.length; // Get value
        let validity = form.reportValidity();
        if (validity) {
            addBookToLibrary();
            // Checks value and closes modal
            if (_library.length > length) {
                modal.style.display = 'none';
            }
        }
    }

    return {
        libraryAPI
    }
})();

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
