(() => {
  const GRID = {
    5: [1,5],
    20: [4,5],
    40: [5,8],
    80: [8,10],
    100: [10,10]
  };

  const maxContainerSize = 640;

  const imageUpload = document.getElementById('imageUpload');
  const difficultyEl = document.getElementById('difficulty');
  const startBtn = document.getElementById('startBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const resetBtn = document.getElementById('resetBtn');
  const undoBtn = document.getElementById('undoBtn');
  const slotsContainer = document.getElementById('slotsContainer');
  const poolContainer = document.getElementById('poolContainer');
  const messageEl = document.getElementById('message');
  const timerEl = document.getElementById('timer');
  const movesEl = document.getElementById('moves');

  let imageDataUrl = null;
  let naturalW = 0, naturalH = 0;
  let rows = 0, cols = 0;
  let slotW = 0, slotH = 0;
  let started = false;
  let moves = 0;
  let timer = null;
  let seconds = 0;
  let selectedPiece = null;

  let moveHistory = [];

  imageUpload.addEventListener('change', (ev) => {
    const f = ev.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageDataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        naturalW = img.naturalWidth;
        naturalH = img.naturalHeight;
        messageEl.textContent = `Image ready: ${naturalW}×${naturalH}`;
      };
      img.src = imageDataUrl;
    };
    reader.readAsDataURL(f);
  });

  startBtn.addEventListener('click', () => {
    if (!imageDataUrl) { alert('Please upload an image first'); return; }
    const pieces = parseInt(difficultyEl.value, 10);
    const grid = GRID[pieces];
    if (!grid) { alert('Unsupported difficulty'); return; }
    rows = grid[0]; cols = grid[1];
    startPuzzle(rows, cols);
  });

  shuffleBtn.addEventListener('click', () => {
    if (!imageDataUrl) return;
    shufflePool();
    resetWinState();
  });

  resetBtn.addEventListener('click', () => {
    resetAll();
  });

  undoBtn.addEventListener('click', undoMove);

  function startTimer(){
    stopTimer();
    seconds = 0;
    timerEl.textContent = '00:00';
    timer = setInterval(() => {
      seconds++;
      timerEl.textContent = formatTime(seconds);
    }, 1000);
  }
  function stopTimer(){ if (timer) { clearInterval(timer); timer = null; } }
  function formatTime(s){
    const mm = String(Math.floor(s/60)).padStart(2,'0');
    const ss = String(s%60).padStart(2,'0');
    return `${mm}:${ss}`;
  }

  function startPuzzle(r, c){
    started = true;
    moves = 0;
    movesEl.textContent = '0';
    messageEl.textContent = '';
    startTimer();
    moveHistory = [];
    undoBtn.disabled = true;

    const scale = Math.min(maxContainerSize / naturalW, maxContainerSize / naturalH, 1);
    const displayW = Math.round(naturalW * scale);
    const displayH = Math.round(naturalH * scale);

    slotW = Math.floor(displayW / c);
    slotH = Math.floor(displayH / r);

    const gridW = slotW * c;
    const gridH = slotH * r;

    slotsContainer.style.width = gridW + 'px';
    slotsContainer.style.height = gridH + 'px';
    slotsContainer.style.gridTemplateColumns = `repeat(${c}, ${slotW}px)`;
    slotsContainer.style.gridTemplateRows = `repeat(${r}, ${slotH}px)`;
    slotsContainer.innerHTML = '';
    poolContainer.innerHTML = '';

    for(let row=0; row<r; row++){
      for(let col=0; col<c; col++){
        const idx = row*c + col;
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.index = idx;
        slot.style.width = slotW + 'px';
        slot.style.height = slotH + 'px';
        slot.addEventListener('dragover', ev => { ev.preventDefault(); slot.classList.add('highlight'); });
        slot.addEventListener('dragleave', () => { slot.classList.remove('highlight'); });
        slot.addEventListener('drop', onSlotDrop);
        slot.addEventListener('click', () => {
          if (selectedPiece) {
            placePieceIntoSlot(selectedPiece, slot);
            clearSelection();
            slot.classList.remove('highlight');
          }
        });
        slotsContainer.appendChild(slot);
      }
    }

    const piecesArr = [];
    for(let row=0; row<r; row++){
      for(let col=0; col<c; col++){
        const idx = row*c + col;
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.draggable = true;
        piece.dataset.correct = idx;
        piece.dataset.id = 'p' + idx;
        const bgSizeX = gridW;
        const bgSizeY = gridH;
        const posX = -(col * slotW);
        const posY = -(row * slotH);
        piece.style.backgroundImage = `url(${imageDataUrl})`;
        piece.style.backgroundSize = `${bgSizeX}px ${bgSizeY}px`;
        piece.style.backgroundPosition = `${posX}px ${posY}px`;
        piece.style.width = slotW + 'px';
        piece.style.height = slotH + 'px';
        piece.addEventListener('dragstart', onDragStart);
        piece.addEventListener('click', onPieceClick);
        piece.addEventListener('touchstart', onPieceClick, {passive:true});
        piecesArr.push(piece);
      }
    }

    shuffleArray(piecesArr);
    piecesArr.forEach(p => {
      p.classList.remove('correct','selected');
      poolContainer.appendChild(p);
    });

    poolContainer.addEventListener('dragover', ev => ev.preventDefault());
    poolContainer.addEventListener('drop', ev => {
      ev.preventDefault();
      const id = ev.dataTransfer.getData('text/plain');
      const piece = document.querySelector(`[data-id="${id}"]`);
      if (!piece) return;
      movePieceToPool(piece);
      checkWinCondition();
    });

    shuffleBtn.disabled = false;
    resetBtn.disabled = false;
  }

  function onDragStart(ev){
    const piece = ev.currentTarget;
    ev.dataTransfer.setData('text/plain', piece.dataset.id);
    ev.dataTransfer.effectAllowed = 'move';
    window.__draggedPiece = piece;
    clearSelection();
  }

  function onSlotDrop(ev){
    ev.preventDefault();
    this.classList.remove('highlight');
    const id = ev.dataTransfer.getData('text/plain') || (window.__draggedPiece && window.__draggedPiece.dataset.id);
    if (!id) return;
    const piece = document.querySelector(`[data-id="${id}"]`);
    if (!piece) return;
    placePieceIntoSlot(piece, this);
  }

  function placePieceIntoSlot(piece, slot){
    const sourceParent = piece.parentElement;
    const existing = slot.querySelector('.piece');

    moveHistory.push({
      pieceId: piece.dataset.id,
      from: sourceParent,
      to: slot,
      swappedId: existing ? existing.dataset.id : null
    });
    undoBtn.disabled = false;

    if (existing) {
      if (sourceParent.classList.contains('slot')) {
        sourceParent.appendChild(existing);
      } else {
        poolContainer.appendChild(existing);
      }
    }
    slot.appendChild(piece);

    moves++;
    movesEl.textContent = String(moves);
    resetWinState();
    checkWinCondition();
  }

  function movePieceToPool(piece){
    const sourceParent = piece.parentElement;
    moveHistory.push({
      pieceId: piece.dataset.id,
      from: sourceParent,
      to: poolContainer,
      swappedId: null
    });
    undoBtn.disabled = false;

    poolContainer.appendChild(piece);
    moves++;
    movesEl.textContent = String(moves);
    resetWinState();
  }

  function onPieceClick(ev){
    const piece = ev.currentTarget;
    if (selectedPiece === piece) {
      clearSelection();
      return;
    }
    clearSelection();
    selectedPiece = piece;
    piece.classList.add('selected');
  }
  function clearSelection(){
    if (selectedPiece) selectedPiece.classList.remove('selected');
    selectedPiece = null;
  }

  function undoMove(){
    if (moveHistory.length === 0) {
      alert("No moves to undo!");
      return;
    }

    const last = moveHistory.pop();
    const piece = document.querySelector(`[data-id="${last.pieceId}"]`);

    if (piece && last.from) {
      last.from.appendChild(piece);
    }

    if (last.swappedId) {
      const swappedPiece = document.querySelector(`[data-id="${last.swappedId}"]`);
      if (swappedPiece && last.to) {
        last.to.appendChild(swappedPiece);
      }
    }

    moves++;
    movesEl.textContent = String(moves);

    if (moveHistory.length === 0) {
      undoBtn.disabled = true;
    }

    resetWinState();
    checkWinCondition();
  }

  function checkWinCondition(){
    const total = rows * cols;
    let correctCount = 0;
    const slots = Array.from(slotsContainer.children);
    for(let i=0;i<slots.length;i++){
      const slot = slots[i];
      const p = slot.querySelector('.piece');
      if (!p) break;
      if (parseInt(p.dataset.correct,10) === i) {
        correctCount++;
        p.classList.add('correct');
      } else {
        p.classList.remove('correct');
      }
    }
    if (correctCount === total) {
      onWin();
    }
  }

  function onWin(){
    messageEl.textContent = `🎉 Puzzle solved in ${formatTime(seconds)} with ${moves} moves!`;
    stopTimer();
  }

  function resetWinState(){
    messageEl.textContent = '';
  }

  function shufflePool(){
    const pieces = Array.from(poolContainer.querySelectorAll('.piece'));
    shuffleArray(pieces);
    pieces.forEach(p => poolContainer.appendChild(p));
    moves++;
    movesEl.textContent = String(moves);
    resetWinState();
  }

  function resetAll(){
    stopTimer();
    slotsContainer.innerHTML = '';
    poolContainer.innerHTML = '';
    messageEl.textContent = '';
    timerEl.textContent = '00:00';
    moves = 0; movesEl.textContent = '0';
    shuffleBtn.disabled = true;
    resetBtn.disabled = true;
    undoBtn.disabled = true;
    started = false;
    selectedPiece = null;
    moveHistory = [];
  }

  // helpers
  function shuffleArray(a){
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  window.addEventListener('dragend', () => { window.__draggedPiece = null; });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') clearSelection();
  });

  window.__puzzle = { startPuzzle, resetAll };

})();
