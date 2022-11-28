const modal = document.querySelector('.modal-bg');
const button = document.querySelector('.add');
const modalScale = document.querySelector('.modal');


button.onclick = function() {
    modal.style.display = 'block';
    modalScale.classList.add('scale');
};

window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
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
    console.log(library); // remove me
}

function populate() {
    const bookshelf = document.querySelector('.bookshelf');

    let books = document.querySelectorAll('.book');
    books.forEach(book => {
        bookshelf.removeChild(book);
    });

    library.forEach(book => {
        const bk = document.createElement('div');
        bk.classList.add('book');
        bookshelf.appendChild(bk);

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = book.title;
        bk.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = book.author;
        bk.appendChild(author);

        const pages = document.createElement('div');
        pages.classList.add('pages');
        pages.textContent = `${book.pages} pages`;
        bk.appendChild(pages);

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
    changeReadStatus();
}

function changeReadStatus () {
    const readStatus = document.querySelectorAll('.read-status');

    readStatus.forEach(book => {
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
        book.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('read')) {
                e.target.textContent = 'Unread';
                return;
            }
            e.target.textContent = 'Read';
        });
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
    thisBook.classList.remove('book');
    const title = thisBook.firstChild.innerHTML;
    console.log(title)
    thisBook.parentNode.removeChild(thisBook);

    for (let i = library.length - 1; i >= 0; i--) {
        if (library[i].title === title) {
            library.splice(i, 1);
        }
    }
}

const submitBook = document.querySelector('.submit-book');
submitBook.addEventListener('click', (e) => {
    e.preventDefault();
    const length = library.length;
    addBookToLibrary();
    if (library.length > length) {
        modal.style.display = 'none';
    }
});