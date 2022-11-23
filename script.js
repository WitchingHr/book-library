const modal = document.querySelector('.modal-bg');

const button = document.querySelector('.add');

button.onclick = function() {
    modal.style.display = 'block';
}

window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
};

