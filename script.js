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