const modal = document.querySelector('.modal-bg');
const button = document.querySelector('.add');
const modalScale = document.querySelector('.modal');
const readStatus = document.querySelector('.read-status');

button.onclick = function() {
    modal.style.display = 'block';
    modalScale.classList.add('scale');
};

window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};

readStatus.addEventListener('click', (e) => {
    if (e.target.classList.contains('read')) {
        e.target.classList.remove('read');
        e.target.classList.add('unread');
        e.target.textContent = 'Unread';
        return;
    }
    e.target.classList.remove('unread');
    e.target.classList.add('read');
    e.target.textContent = 'Read';
});

readStatus.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('read')) {
        e.target.textContent = 'Unread';
        return;
    }
    e.target.textContent = 'Read';
});

readStatus.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('read')) {
        e.target.textContent = 'Read';
        return;
    }
    e.target.textContent = 'Unread';
});

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
    const read = document.getElementsByName('read').value;
    library.push(new Book(title, author, pages, read));
    populate();
    console.log(library); // remove me
}

function populate() {
    const bookshelf = document.querySelector('.bookshelf');
    let books = document.querySelectorAll('.book');
    books.forEach(book => {
        bookshelf.removeChild(book);
    })
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
        read.classList.add('read');
        read.classList.add('book-buttons');
        read.classList.add('read-status')
        read.textContent = 'Read'; // FIX ME
        wrapper.appendChild(read);

        const remove = document.createElement('button');
        remove.classList.add('remove');
        remove.classList.add('book-buttons')
        remove.textContent = 'Remove';
        wrapper.appendChild(remove);
    })
}

const submitBook = document.querySelector('.submit-book');

submitBook.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary();
});