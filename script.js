const library = (function () {
    const library = {
        library: [],
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.modal = document.querySelector('.modal-bg');
            this.button = document.querySelector('.add');
            this.modalScale = document.querySelector('.modal');
            this.bookshelf = document.querySelector('.bookshelf');
            this.statsPage = document.querySelector('.stats');
            // Form:
            this.form = document.querySelector('form');
            this.formTitle = document.getElementById('book-title');
            this.formAuthor = document.getElementById('book-author');
            this.formPages = document.getElementById('book-pages');
            this.formRadio = document.getElementsByName('read');
            this.submit = document.querySelector('.submit-book');
            // Books
            this.remove = document.querySelectorAll('.remove');
            this.readStatus = document.querySelectorAll('.read-status');
        },
        bindEvents: function() {
            this.button.addEventListener('click', this.openModal.bind(this));
            window.addEventListener('keydown', this.openCloseModalByKey.bind(this));
            window.addEventListener('click', this.closeModal.bind(this));
            this.submit.addEventListener('click', this.submitBook.bind(this));
        },
        openModal: function() {
            this.modal.style.display = 'block';
            this.modalScale.classList.add('scale');
            this.clearForm();
            this.formTitle.focus();
        },
        closeModal: function(e) {
            if (e.target == this.modal) {
                this.modal.style.display = 'none';
            }
        },
        openCloseModalByKey: function(e) {
            if (e.key == 'Enter' && this.modal.style.display == 'none') {
                this.modal.style.display = 'block';
                this.modalScale.classList.add('scale');
                this.clearForm();
                this.formTitle.focus();
            }
            if (e.key == 'Escape' && this.modal.style.display == 'block') {
                this.clearForm();
                this.modal.style.display = 'none';
            }
        },
        clearForm: function() {
            this.formTitle.value = '';
            this.formAuthor.value = '';
            this.formPages.value = '';
            this.formRadio.forEach(button => {
                button.checked = false;
            })
        },
        Book: function(title, author, pages, read) {
            return {
                title,
                author,
                pages,
                read
            }
        },
        addBookToLibrary: function() {
            const title = this.formTitle.value;
            const author = this.formAuthor.value;
            const pages = this.formPages.value;
            let readStatus = '';
            this.formRadio.forEach(radio => {
                if (radio.checked) readStatus = radio.value;
            });
            this.library.push(this.Book(title, author, pages, readStatus));
            this.populate();
            this.clearForm();
        },
        populate: function() {
            const books = document.querySelectorAll('.book');
            // Deletes books from DOM
            books.forEach(book => {
                bookshelf.removeChild(book); 
            });
            // Adds books to DOM
            this.library.forEach(book => { 
                const bk = document.createElement('div');
                bk.classList.add('book');
                this.bookshelf.appendChild(bk);

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
            this.bindBookEvents();
        },
        bindBookEvents: function() {
            this.cacheDOM();
            this.readStatus.forEach(book => {
                book.addEventListener('click', this.changeReadStatus.bind(this));
                book.addEventListener('mouseover', this.previewReadStatus.bind(this));
                book.addEventListener('mouseout', this.revertPreview.bind(this));
            })
            this.remove.forEach(book => {
                book.addEventListener('click', this.removeBook.bind(this));
            })
        },
        changeReadStatus: function(e) {
            const title = e.target.parentNode.parentNode.firstChild.innerHTML;
            if (e.target.classList.contains('read')) {
                e.target.classList.remove('read');
                e.target.classList.add('unread');
                e.target.textContent = 'Unread';
                for (let i = 0; i < this.library.length; i++) {
                    if (this.library[i].title === title) {
                        this.library[i].read = 'no';
                    }
                }
                return;
            }
            e.target.classList.remove('unread');
            e.target.classList.add('read');
            e.target.textContent = 'Read';
            for (let i = 0; i < this.library.length; i++) { 
                if (this.library[i].title === title) {
                    this.library[i].read = 'yes';
                }
            }
        },
        previewReadStatus: function(e) {
            if (e.target.classList.contains('read')) {
                e.target.textContent = 'Unread';
                return;
            }
            e.target.textContent = 'Read';
        },
        revertPreview: function(e) {
            if (e.target.classList.contains('read')) {
                e.target.textContent = 'Read';
                return;
            }
            e.target.textContent = 'Unread';
        },
        removeBook: function(e) {
            const thisBook = e.target.parentNode.parentNode;
            const title = thisBook.firstChild.innerHTML;
            // Removes book from DOM
            thisBook.parentNode.removeChild(thisBook);
            //Removes book from library array
            for (let i = this.library.length - 1; i >= 0; i--) {
                if (this.library[i].title === title) {
                    this.library.splice(i, 1);
                }
            }
        },
        submitBook: function(e) {
            e.preventDefault();
            this.cacheDOM();
            const length = this.library.length; // Get value
            let validity = this.form.reportValidity();
            if (validity) {
                this.addBookToLibrary();
                // Checks value and closes modal
                if (this.library.length > length) {
                    this.modal.style.display = 'none';
                }
            }
        },
    };
    library.init();
})();

// const toggle = document.querySelector('.stats-toggle');
// toggle.addEventListener('click', () => {
//     if (toggle.textContent == 'Stats') {
//         toggle.textContent = 'Bookshelf'
//         bookshelf.style.display = 'none';
//         statsPage.style.display = 'block';
//         getStats();
//     } else if (toggle.textContent == 'Bookshelf') {
//         toggle.textContent = 'Stats';
//         statsPage.style.display = 'none';
//         bookshelf.style.display = 'block'
//         statsPage.innerHTML = ''; // Clear page
//     }
// })

// function getStats() {
//     const wrapper = document.createElement('div');
//     wrapper.classList.add('stats-wrapper')
//     statsPage.append(wrapper);

//     const bookTotal = document.createElement('div');
//     bookTotal.innerHTML = `Books: <span class='stat-number'>${library.length}</span>`;
//     wrapper.append(bookTotal);

//     const booksRead = document.createElement('div');
//     const readBooks = function() {
//         const read = library.filter(book => book.read === 'yes');
//         return read.length;
//     }
//     booksRead.innerHTML = `Read: <span class='stat-number'>${readBooks()}</span>`;
//     wrapper.append(booksRead);

//     const booksUnread = document.createElement('div');
//     const unreadBooks = function() {
//         const unread = library.filter(book => book.read === 'no');
//         return unread.length;
//     }
//     booksUnread.innerHTML = `Unread: <span class='stat-number'>${unreadBooks()}</span>`;
//     wrapper.append(booksUnread);

//     const pagesRead = document.createElement('div');
//     const totalPages = function() {
//         const read = library.filter(book => book.read === 'yes');
//         const pages = read.reduce((total, book) => {
//             return total += Number(book.pages);
//         }, 0);
//         return pages;
//     };
//     pagesRead.innerHTML = `Total Pages Read: <span class='stat-number'>${totalPages()}</span>`
//     wrapper.append(pagesRead);
// };
