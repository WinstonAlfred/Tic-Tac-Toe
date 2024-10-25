# Modern Tic Tac Toe Game

A feature-rich, responsive Tic Tac Toe game built with React and TypeScript, featuring multiple game modes, themes, and an unbeatable AI opponent.

## Features

### Game Modes
- **Local 2P**: Play against a friend on the same device
- **Bot (Easy)**: Play against an AI that makes random moves
- **Bot (Medium)**: Play against an AI that alternates between random and optimal moves
- **Bot (Hard)**: Play against an unbeatable AI using the minimax algorithm

### Visual Themes
- **Classic**: Traditional black and white design
- **Dark**: Dark mode with softer contrast
- **Nature**: Soothing green color palette
- **Sunset**: Warm orange and yellow tones
- **Ocean**: Calming blue color scheme

### Gameplay Features
- Real-time score tracking
- Game state management
- Move validation
- Winner detection
- Draw detection
- Turn indicators
- Reset game functionality
- Reset scores functionality

## Technical Implementation

### Core Technologies
- React with TypeScript
- Tailwind CSS for styling
- Lucide React icons

### AI Implementation
The game implements three levels of AI difficulty:
1. **Easy**: Uses random move selection
2. **Medium**: 50% chance of either random move or optimal move
3. **Hard**: Uses the minimax algorithm with alpha-beta pruning for optimal play

### Key Components

#### Theme System
- Implements a flexible theming system using Tailwind CSS
- Each theme defines colors for:
  - Background
  - Board
  - Cells
  - Text
  - Borders
  - Player markers (X and O)

#### Game Logic
- Uses React's useState and useEffect for state management
- Implements efficient winner calculation
- Handles game state transitions
- Manages player turns
- Tracks scores

#### AI Logic
- Implements minimax algorithm with alpha-beta pruning
- Optimizes performance with depth-limited search
- Provides varying difficulty levels through strategic randomization

### UI Components
- Custom-styled game board
- Themed select dropdowns for game mode and theme selection
- Score badges
- Reset and new game buttons
- Turn indicators
- Win/draw state displays

## Code Structure

### Main Components
- `TicTacToe.tsx`: Main game component
- Button component with various styles and variants
- Select components for game mode and theme selection
- Badge component for score display

### Type Definitions
```typescript
type GameMode = 'local' | 'bot-easy' | 'bot-medium' | 'bot-hard';
type ThemeKey = 'classic' | 'dark' | 'nature' | 'sunset' | 'ocean';
type Player = 'X' | 'O' | null;
type Board = Player[];
```

### Helper Functions
- `calculateWinner`: Determines game winner
- `getEmptyCells`: Finds available moves
- `minimax`: Implements AI decision making
- `getBotMove`: Handles AI move selection
- `handleClick`: Processes player moves
- `resetGame`: Resets game state
- `resetScores`: Resets score tracking

## Best Practices Implemented

1. **Type Safety**
   - Comprehensive TypeScript types
   - Interface definitions for props and state
   - Strict type checking

2. **Performance Optimization**
   - useCallback for memoized functions
   - Efficient state updates
   - Optimized AI algorithm with alpha-beta pruning

3. **Clean Code**
   - Modular component structure
   - Clear naming conventions
   - Separation of concerns
   - Well-documented functions

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation support
   - Focus management

5. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts
   - Responsive grid system
   - Adaptive UI elements

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## Future Enhancements

- Online multiplayer support
- User accounts and statistics
- Additional themes
- Animated moves
- Sound effects
- Replay functionality
- Leaderboard system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Play The Game
https://tic-tac-toe-alpha-five-43.vercel.app/
