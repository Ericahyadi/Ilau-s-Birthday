const container = document.querySelector('.puzzle-container');
const popup = document.getElementById('popup');
let pieces = [];

// Pakai gambar asli kamu di sini nanti
const image = 'images/Puzzle.jpg';

const size = 4;

function createPuzzle() {
  for (let i = 0; i < size * size; i++) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.backgroundImage = `url(${image})`;
    const x = (i % size) * -80;
    const y = Math.floor(i / size) * -120;
    piece.style.backgroundPosition = `${x}px ${y}px`;

    piece.setAttribute('draggable', 'true');
    piece.dataset.index = i;
    pieces.push(piece);
  }
  shuffleAndRender();
}

function shuffleAndRender() {
  pieces.sort(() => Math.random() - 0.5);
  container.innerHTML = '';
  pieces.forEach(p => container.appendChild(p));
}
container.addEventListener('dragstart', e => {
  dragged = e.target;
  dragged.style.cursor = 'grabbing';
});

container.addEventListener('dragend', e => {
  dragged.style.cursor = 'grab';
});

let dragged;

container.addEventListener('dragstart', e => dragged = e.target);
container.addEventListener('dragover', e => e.preventDefault());
container.addEventListener('drop', e => {
  if (e.target.classList.contains('puzzle-piece')) {
    const draggedIndex = [...container.children].indexOf(dragged);
    const targetIndex = [...container.children].indexOf(e.target);

    if (draggedIndex > -1 && targetIndex > -1) {
      container.insertBefore(dragged, container.children[targetIndex]);
      container.insertBefore(e.target, container.children[draggedIndex]);
    }
    checkWin();
  }
});

function checkWin() {
  console.log('checkWin dijalankan');
  const current = [...container.children];
  if (current.every((p, i) => parseInt(p.dataset.index) === i)) {
    current.forEach(piece => {
      // Reset glow animasi
      piece.classList.remove('glow');
      void piece.offsetWidth;
      piece.classList.add('glow');
    });

    // Tambahkan class solved ke container
    setTimeout(() => {
      container.classList.add('solved');
      popup.style.display = 'flex';
    }, 1000);
  }
}

createPuzzle();

