const modal = document.querySelector('.modal-bg');

const button = document.querySelector('.add');

const modalScale = document.querySelector('.modal');

button.onclick = function() {
    modal.style.display = 'block';
    modalScale.classList.add('scale');
}

window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};

