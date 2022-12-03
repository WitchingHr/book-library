////////////////////////////////////////////////////////////
// LIBRARY
////////////////////////////////////////////////////////////

const library = (function () {

  const library = [];

  const _modal = document.querySelector('.modal-bg');
  const _button = document.querySelector('.add');
  const _addbutton = document.querySelector('.add-button');
  const _modalScale = document.querySelector('.modal');
  const _bookshelf = document.querySelector('.wrapper');
  // Form:
  const _form = document.querySelector('form');
  const _formTitle = document.getElementById('book-title');
  const _formAuthor = document.getElementById('book-author');
  const _formPages = document.getElementById('book-pages');
  const _formRadio = document.getElementsByName('read');
  const _submit = document.querySelector('.submit-book');
  // Bind events:
  _button.addEventListener('click', __openModal);
  _addbutton.addEventListener('click', __openModal);
  window.addEventListener('keydown', __openCloseModalByKey);
  window.addEventListener('click', __closeModal);
  _submit.addEventListener('click', __submitBook);

  function __openModal() {
    _modal.style.display = 'block';
    _modalScale.classList.add('scale');
    _clearForm();
    _formTitle.focus();
  }

  function __closeModal(e) {
    if (e.target == _modal) {
      _modal.style.display = 'none';
    }
  }

  function __openCloseModalByKey(e) {
    if (e.key == 'Enter' && _modal.style.display == 'none') {
      _modal.style.display = 'block';
      _modalScale.classList.add('scale');
      _clearForm();
      _formTitle.focus();
    }
    if (e.key == 'Escape' && _modal.style.display == 'block') {
      _clearForm();
      _modal.style.display = 'none';
    }
  }

  function _clearForm() {
    _formTitle.value = '';
    _formAuthor.value = '';
    _formPages.value = '';
    _formRadio.forEach(button => {
      button.checked = false;
    });
  }

  function Book(title, author, pages, read) {
    return {
        title,
        author,
        pages,
        read
    };
  }

  function _addBookToLibrary() {
    const title = _formTitle.value;
    const author = _formAuthor.value;
    const pages = _formPages.value;
    let readStatus = '';
    _formRadio.forEach(radio => {
      if (radio.checked) readStatus = radio.value;
    });
    library.push(Book(title, author, pages, readStatus));
    _populate();
    _clearForm();
  }

  function _populate() {
    const books = document.querySelectorAll('.book');
    // Deletes books from DOM
    books.forEach(book => {
      _bookshelf.removeChild(book); 
    });
    // Adds books to DOM
    library.forEach(book => { 
      const bk = document.createElement('div');
      bk.classList.add('book');
      _bookshelf.appendChild(bk);

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
    _bindBookEvents();
  }

  function _bindBookEvents() {
    const readStatus = document.querySelectorAll('.read-status');
    readStatus.forEach(book => {
      book.addEventListener('click', __changeReadStatus);
      book.addEventListener('mouseover', __previewReadStatus);
      book.addEventListener('mouseout', __revertPreview);
    });
    const remove = document.querySelectorAll('.remove');
    remove.forEach(book => {
      book.addEventListener('click', __removeBook);
    });
  }

  function __changeReadStatus(e) {
    const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;
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
  }

  function __previewReadStatus(e) {
    if (e.target.classList.contains('read')) {
      e.target.textContent = 'Unread';
      return;
    }
    e.target.textContent = 'Read';
  }

  function __revertPreview(e) {
    if (e.target.classList.contains('read')) {
      e.target.textContent = 'Read';
      return;
    }
    e.target.textContent = 'Unread';
  }

  function __removeBook(e) {
    const thisBook = e.target.parentNode.parentNode;
    const title = thisBook.firstChild.firstChild.innerHTML;
    // Removes book from DOM
    thisBook.parentNode.removeChild(thisBook);
    //Removes book from library array
    for (let i = library.length - 1; i >= 0; i--) {
      if (library[i].title === title) {
        library.splice(i, 1);
      }
    }  
  }

  function __submitBook(e) {
    e.preventDefault();
    const length = library.length; // Get value
    let validity = _form.reportValidity();
    if (validity) {
      _addBookToLibrary();
      // Checks value and closes modal
      if (library.length > length) {
        _modal.style.display = 'none';
      }
    }
  }

  return {
    library: library
  }
})();

////////////////////////////////////////////////////////////
// STATS PAGE
////////////////////////////////////////////////////////////

const stats = (function() {
  const _toggle = document.querySelector('.stats-toggle');
  const _bookshelf = document.querySelector('.bookshelf');
  const _statsPage = document.querySelector('.stats');

  _toggle.addEventListener('click', __openStatsPage);

  function __openStatsPage() {
    if (_toggle.classList.contains('chart')) {
      _toggle.classList.add('shelf');
      _toggle.classList.remove('chart');
      _bookshelf.style.display = 'none';
      _statsPage.style.display = 'block';
      _getStats();
    } else if (_toggle.classList.contains('shelf')) {
      _toggle.classList.add('chart');
      _toggle.classList.remove('shelf');
      _statsPage.style.display = 'none';
      _bookshelf.style.display = 'block'
      _statsPage.innerHTML = ''; // Clear page
    }
  }

  function _getStats() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('stats-wrapper')
    _statsPage.append(wrapper);

    const bookTotal = document.createElement('div');
    bookTotal.innerHTML = `Books: <span class='stat-number'>${library.library.length}</span>`;
    wrapper.append(bookTotal);

    const booksRead = document.createElement('div');
    const readBooks = function() {
      const read = library.library.filter(book => book.read === 'yes');
      return read.length;
    };
    booksRead.innerHTML = `Read: <span class='stat-number'>${readBooks()}</span>`;
    wrapper.append(booksRead);

    const booksUnread = document.createElement('div');
    const unreadBooks = function() {
      const unread = library.library.filter(book => book.read === 'no');
      return unread.length;
    };
    booksUnread.innerHTML = `Unread: <span class='stat-number'>${unreadBooks()}</span>`;
    wrapper.append(booksUnread);

    const pagesRead = document.createElement('div');
    const totalPages = function() {
      const read = library.library.filter(book => book.read === 'yes');
      const pages = read.reduce((total, book) => {
        return total += Number(book.pages);
      }, 0);
      return pages;
    };
    pagesRead.innerHTML = `Total Pages Read: <span class='stat-number'>${totalPages()}</span>`;
    wrapper.append(pagesRead);
  };
})();