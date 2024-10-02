# Tic-Tac-Toe Game

This is a simple, browser-based Tic-Tac-Toe game built with HTML, CSS, and JavaScript. It features a clean, responsive design and includes a scoreboard to keep track of wins and draws.

## Features

- Classic Tic-Tac-Toe gameplay
- Responsive design that works on desktop and mobile browsers
- Scoreboard to track X wins, O wins, and draws
- Reset button to start a new game

## How It's Made

### HTML (index.html)

The game's structure is defined in HTML. It includes:

- A title
- A scoreboard to display wins and draws
- A 3x3 grid for the game board
- A status display to show the current player or game result
- A reset button

### CSS (styles.css)

The styling is handled by CSS. Key features include:

- Flexbox for layout
- Grid for the game board
- Hover effects on cells for better user interaction
- Responsive design to ensure the game looks good on various screen sizes

### JavaScript (script.js)

The game logic is implemented in JavaScript. It handles:

- Player turns
- Win condition checks
- Score tracking
- Game state management
- DOM manipulation to update the UI

Key functions:

- `handleCellClick`: Manages player moves
- `handleResultValidation`: Checks for win or draw conditions
- `updateScore`: Keeps track of wins and draws
- `handleReset`: Resets the game board for a new game

## How to Play

1. The game starts with Player X
2. Click on an empty cell to make a move
3. The game alternates between X and O
4. The first player to get three in a row (horizontally, vertically, or diagonally) wins
5. If all cells are filled and no player has won, the game is a draw
6. Use the reset button to start a new game

## Development

To run this project locally:

1. Clone the repository
2. Open `index.html` in a web browser

To make changes:

1. Edit the HTML, CSS, or JavaScript files as needed
2. Refresh the browser to see your changes

## Deployment

This game is deployed on Vercel. Any pushes to the main branch will automatically trigger a new deployment.

## Future Improvements

- Implement a difficulty setting
- Add sound effects
- Create a dark mode option

## Play the Game
https://tic-tac-toe-beta-liard.vercel.app/


Feel free to contribute to this project by submitting pull requests or opening issues for any bugs or feature requests!
