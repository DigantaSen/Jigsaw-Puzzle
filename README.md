# 🧩 Jigsaw Puzzle Maker (Q3)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=github)](https://digantasen.github.io/SSD-Course-Structure/jigsaw.html)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Student ID:** 2025201050  
**Course:** CS6.302 – Software System Development (Monsoon 2025)  
**Assignment:** Q3 - Interactive Jigsaw Puzzle Game

---

## 📖 Overview

An interactive **Jigsaw Puzzle Maker** that transforms any image into a customizable puzzle game. Upload your favorite image, select difficulty, and solve the puzzle with intuitive drag-and-drop mechanics. Features include smart piece swapping, undo functionality, real-time tracking, and visual feedback for correct placements.

**🎮 [Play Live Demo →](https://digantasen.github.io/SSD-Course-Structure/jigsaw.html)**

---

## ✨ Key Features

### 🎨 Image Upload & Processing
- **Flexible Input:** Upload any JPEG or PNG image
- **Smart Scaling:** Automatic image resizing while preserving aspect ratio
- **Max Display:** 640px optimal viewing size
- **Preview:** See your image before puzzle generation

### 🎯 Difficulty Levels
| Level | Pieces | Grid Layout | Difficulty |
|-------|--------|-------------|------------|
| Easy | 5 | 2×3 or 3×2 | ⭐ Beginner |
| Medium | 20 | 4×5 or 5×4 | ⭐⭐ Casual |
| Hard | 40 | 5×8 or 8×5 | ⭐⭐⭐ Challenging |
| Expert | 80 | 8×10 or 10×8 | ⭐⭐⭐⭐ Advanced |
| Master | 100 | 10×10 | ⭐⭐⭐⭐⭐ Pro |

### 🎮 Gameplay Mechanics
- **Drag & Drop:** Intuitive piece movement from pool to board
- **Smart Swap:** Drop on occupied slots to exchange pieces
- **Undo Last Move:** Revert mistakes with one click
- **Visual Feedback:** Green highlight for correctly placed pieces
- **Mobile Support:** Touch-friendly interface for tablets/phones

### 📊 Real-Time Tracking
- ⏱️ **Timer:** Tracks time elapsed since puzzle start
- 🎯 **Move Counter:** Counts every piece placement
- ✅ **Progress Indicator:** Visual feedback for correct placements
- 🏆 **Completion Detection:** Auto-congratulates on puzzle solve

### 🎨 User Interface
- Clean, modern design with gradient backgrounds
- Responsive layout adapts to screen size
- Clear visual separation between pool and board
- Hover effects and smooth animations
- Accessible controls and instructions

---

## 📂 Project Structure

```
Q3/
├── jigsaw.html         # Main HTML file with puzzle interface
├── style.css           # Complete styling and responsive design
├── script.js           # Core puzzle logic and game mechanics
└── README.md           # Comprehensive documentation (this file)
```

### File Details

**`jigsaw.html`** (Main Application)
- Image upload interface
- Difficulty selection controls
- Puzzle board and piece pool
- Timer and move counter displays
- Undo button and controls

**`style.css`** (Styling)
- Modern gradient-based design
- Responsive grid layouts
- Drag-and-drop visual feedback
- Hover effects and animations
- Mobile-optimized styles

**`script.js`** (Game Logic)
- Image processing and scaling
- Puzzle grid generation
- Drag-and-drop event handling
- Piece swap mechanics
- Undo functionality
- Correctness validation
- Timer and move tracking

---

## 🚀 How to Run

### Option 1: Live Demo (Recommended)
Visit the hosted version: **[Play Now →](https://digantasen.github.io/SSD-Course-Structure/jigsaw.html)**

### Option 2: Local Development
1. **Clone/Download** the project folder:
   ```bash
   git clone https://github.com/DigantaSen/SSD-Course-Structure.git
   cd SSD-Course-Structure
   ```

2. **Open in Browser:**
   - Simply double-click `jigsaw.html`
   - Or use a local server:
     ```bash
     python3 -m http.server 8080
     # Open http://localhost:8080/jigsaw.html
     ```

3. **Start Playing:**
   - Click "Choose File" and upload an image
   - Select difficulty level (5-100 pieces)
   - Click "Create Puzzle"
   - Drag pieces from pool to board
   - Use "Undo Last Move" if needed
   - Complete the puzzle!

---

## 🎮 How to Play

### Step 1: Upload Image
1. Click the **"Choose File"** button
2. Select a JPEG or PNG image from your device
3. Preview appears showing your selected image

### Step 2: Select Difficulty
Choose from 5 difficulty levels:
- **5 pieces** - Perfect for quick games
- **20 pieces** - Good for beginners
- **40 pieces** - Moderate challenge
- **80 pieces** - Expert level
- **100 pieces** - Master challenge

### Step 3: Create Puzzle
1. Click **"Create Puzzle"** button
2. Watch as pieces are generated and shuffled
3. Timer starts automatically

### Step 4: Solve the Puzzle
1. **Drag** pieces from the pool (top area)
2. **Drop** them into correct positions on the board
3. **Swap** by dropping on occupied slots
4. Correctly placed pieces turn **green**
5. Use **"Undo Last Move"** to revert mistakes

### Step 5: Win!
- Complete the puzzle to see congratulations message
- View your final time and move count
- Start a new puzzle with a different image

---

## 🎯 Game Mechanics

### Drag & Drop System
- **Pick Up:** Click and hold on a piece in the pool
- **Move:** Drag the piece over the board
- **Place:** Drop on an empty slot to place
- **Swap:** Drop on a filled slot to exchange pieces
- **Return:** Drop outside board to return to pool

### Undo Functionality
- Reverts the most recent move
- Restores pieces to previous positions
- Decreases move counter
- Can undo swaps and placements

### Validation System
- Checks each piece position after placement
- Compares with correct solution
- Highlights correct pieces in green
- Auto-detects puzzle completion

### Scoring & Tracking
- **Timer:** Starts when puzzle is created
- **Moves:** Increments on each piece placement
- **Accuracy:** Visual feedback via green highlights

---

## 💡 Technical Implementation

### Image Processing
```javascript
- Canvas-based image slicing
- Aspect ratio preservation
- Dynamic grid calculation
- Background image positioning
```

### Piece Management
```javascript
- Array-based piece tracking
- Position state management
- Drag-and-drop event listeners
- Touch event support for mobile
```

### Grid System
```javascript
- Dynamic row/column calculation
- Automatic layout based on aspect ratio
- Flexible piece sizing
- Responsive container design
```

---

## 📝 Design Decisions & Assumptions

### Image Handling
- Maximum display size: **640px** (maintains performance)
- Aspect ratio is **preserved** during scaling
- Works best with **square or landscape** images
- Portrait images automatically rotated to landscape grid

### Grid Layout
- Grid dimensions calculated to maintain aspect ratio
- For non-square piece counts, uses closest rectangle
- Example: 20 pieces → 4×5 grid (landscape) or 5×4 (portrait)

### Undo Behavior
- Only stores **last move** (not full history)
- Undo disabled when no moves made
- Swaps are treated as single move

### Performance
- Optimized for puzzles up to **100 pieces**
- Smooth animations and transitions
- Minimal DOM manipulation
- Efficient event handling

---

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |
| Chrome Mobile | Android 90+ | ✅ Full |

**Requirements:**
- JavaScript enabled
- HTML5 Canvas support
- CSS3 Grid support
- File API support

---

## 🔧 Technologies Used

- **HTML5** - Structure and Canvas API
- **CSS3** - Styling, Grid Layout, Animations
- **Vanilla JavaScript** - Game logic and DOM manipulation
- **File API** - Image upload handling
- **Canvas API** - Image processing and slicing
- **Drag and Drop API** - Piece movement

---

## 📚 Learning Outcomes

This project demonstrates:
- ✅ DOM manipulation and event handling
- ✅ Canvas API for image processing
- ✅ Drag-and-drop implementation
- ✅ State management in vanilla JavaScript
- ✅ Responsive design principles
- ✅ Algorithm design (shuffling, validation)
- ✅ User experience optimization

---

## 🎓 Academic Context

**Course:** CS6.302 – Software System Development  
**Institution:** IIIT Hyderabad  
**Semester:** Monsoon 2025  
**Assignment:** Q3 - Interactive Web Application

### Assignment Requirements Met
✅ Image upload and processing  
✅ Dynamic puzzle generation  
✅ Multiple difficulty levels  
✅ Drag-and-drop functionality  
✅ Undo mechanism  
✅ Timer and move tracking  
✅ Visual feedback system  
✅ Responsive design  
✅ Complete documentation

---

## 👨‍💻 Author

**Student ID:** 2025201050  
**GitHub:** [DigantaSen](https://github.com/DigantaSen)  
**Repository:** [SSD-Course-Structure](https://github.com/DigantaSen/SSD-Course-Structure)

---

## 📄 License

This project is created for academic purposes as part of coursework at IIIT Hyderabad.

---

## 🔗 Links

- **Live Demo:** https://digantasen.github.io/SSD-Course-Structure/jigsaw.html
- **GitHub Repository:** https://github.com/DigantaSen/SSD-Course-Structure
- **Course Website:** CS6.302 - Software System Development

---

**🎯 Ready to solve puzzles? [Start Playing Now! →](https://digantasen.github.io/SSD-Course-Structure/jigsaw.html)**
