# 🧩 Jigsaw Puzzle Maker (Q3)

This project is part of **CS6.302 – Software System Development (Monsoon 2025)**.  
It implements a **Jigsaw Puzzle Maker** where users can upload an image, choose difficulty, and solve the puzzle.  
Includes **Undo**, timer, moves counter, and drag-and-drop support.

---

## 🚀 Features
- Upload any image (JPEG/PNG) to generate a puzzle.
- Difficulty levels: **5, 20, 40, 80, 100** pieces.
- Pieces are shuffled into a **pool**, drag them into the grid.
- **Swap** works: dropping onto an occupied slot exchanges pieces.
- **Undo Last Move**: revert the previous move.
- Tracks:
  - Time elapsed ⏱️
  - Number of moves 🎯
- Highlights correctly placed pieces in green.
- Works with drag-and-drop and mobile tap-to-select.

---

## 📂 File Structure
```
Q3/
│── jigsaw.html    # Main HTML file
│── style.css      # Styling for puzzle UI
│── script.js      # Puzzle logic with undo
│── README.md      # Documentation
```

---

## ⚙️ How to Run
1. Download the project folder (`Q3`).
2. Open `q3.html` in any modern browser (Chrome/Firefox/Edge).
3. Upload an image and select difficulty.
4. Drag & drop pieces from the pool to the board until the puzzle is solved.
5. Use **Undo Last Move** if needed.

---

## 📝 Assumptions
- Puzzle grid is rectangular based on chosen difficulty (see mapping in script.js).
- Max display size is 640px, image scaled to fit while preserving aspect ratio.
- Works best with square-like images.
- Undo only reverts the most recent move, not full history rewind.

---

## 👨‍💻 Author
Prepared as part of **Assignment 2 – Q3** for SSD (Monsoon 2025).
