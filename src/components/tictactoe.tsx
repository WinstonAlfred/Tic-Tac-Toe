'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Play } from 'lucide-react';

type GameMode = 'local' | 'bot-easy' | 'bot-medium' | 'bot-hard';
type ThemeKey = 'classic' | 'dark' | 'nature' | 'sunset' | 'ocean';
type Player = 'X' | 'O' | null;
type Board = Player[];

interface Theme {
  bg: string;
  board: string;
  cell: string;
  text: string;
  border: string;
  x: string;
  o: string;
}

interface Scores {
  X: number;
  O: number;
}

const themes: Record<ThemeKey, Theme> = {
  classic: {
    bg: 'bg-white',
    board: 'bg-gray-100',
    cell: 'bg-white hover:bg-gray-50',
    text: 'text-gray-900',
    border: 'border-gray-300',
    x: 'text-blue-600',
    o: 'text-red-600'
  },
  dark: {
    bg: 'bg-gray-900',
    board: 'bg-gray-800',
    cell: 'bg-gray-900 hover:bg-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
    x: 'text-blue-400',
    o: 'text-red-400'
  },
  nature: {
    bg: 'bg-green-50',
    board: 'bg-green-100',
    cell: 'bg-green-50 hover:bg-green-100',
    text: 'text-green-900',
    border: 'border-green-300',
    x: 'text-emerald-600',
    o: 'text-lime-600'
  },
  sunset: {
    bg: 'bg-orange-50',
    board: 'bg-orange-100',
    cell: 'bg-orange-50 hover:bg-orange-100',
    text: 'text-orange-900',
    border: 'border-orange-300',
    x: 'text-red-500',
    o: 'text-yellow-500'
  },
  ocean: {
    bg: 'bg-blue-50',
    board: 'bg-blue-100',
    cell: 'bg-blue-50 hover:bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-300',
    x: 'text-cyan-600',
    o: 'text-indigo-600'
  }
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>('local');
  const [theme, setTheme] = useState<ThemeKey>('classic');
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | 'draw'>(null);

  const calculateWinner = useCallback((squares: Board): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }
    return squares.every(square => square !== null) ? 'draw' : null;
  }, []);

  const getEmptyCells = useCallback((squares: Board): number[] => {
    return squares.reduce<number[]>((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);
  }, []);

  const minimax = useCallback((
    squares: Board,
    depth: number,
    isMaximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): number => {
    const winner = calculateWinner(squares);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (winner === 'draw') return 0;

    const emptyCells = getEmptyCells(squares);

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const cell of emptyCells) {
        squares[cell] = 'O';
        const evaluate = minimax(squares, depth + 1, false, alpha, beta);
        squares[cell] = null;
        maxEval = Math.max(maxEval, evaluate);
        alpha = Math.max(alpha, evaluate);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const cell of emptyCells) {
        squares[cell] = 'X';
        const evaluate = minimax(squares, depth + 1, true, alpha, beta);
        squares[cell] = null;
        minEval = Math.min(minEval, evaluate);
        beta = Math.min(beta, evaluate);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [calculateWinner, getEmptyCells]);

  const getBotMove = useCallback((difficulty: string): number | null => {
    const newBoard = [...board];
    const emptyCells = getEmptyCells(newBoard);
    
    if (emptyCells.length === 0) return null;

    switch (difficulty) {
      case 'easy':
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
      
      case 'medium':
        if (Math.random() < 0.5) {
          return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        // Fall through to hard difficulty for optimal move
      
      case 'hard': {
        let bestScore = -Infinity;
        let bestMove = emptyCells[0];
        
        for (const cell of emptyCells) {
          newBoard[cell] = 'O';
          const score = minimax(newBoard, 0, false);
          newBoard[cell] = null;
          
          if (score > bestScore) {
            bestScore = score;
            bestMove = cell;
          }
        }
        return bestMove;
      }
      
      default:
        return null;
    }
  }, [board, getEmptyCells, minimax]);

  const handleClick = useCallback((i: number) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setGameOver(true);
      setWinner(gameWinner);
      if (gameWinner !== 'draw') {
        setScores(prev => ({
          ...prev,
          [gameWinner]: prev[gameWinner] + 1
        }));
      }
    } else {
      setIsXNext(!isXNext);
    }
  }, [board, gameOver, isXNext, calculateWinner]);

  useEffect(() => {
    if (!isXNext && gameMode.startsWith('bot') && !gameOver) {
      const difficulty = gameMode.split('-')[1];
      const botMove = getBotMove(difficulty);
      
      if (botMove !== null) {
        const timeoutId = setTimeout(() => {
          handleClick(botMove);
        }, 500);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isXNext, gameMode, gameOver, getBotMove, handleClick]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  }, []);

  const resetScores = useCallback(() => {
    setScores({ X: 0, O: 0 });
    resetGame();
  }, [resetGame]);

  const currentTheme = themes[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} p-8`}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
<Select
  value={gameMode}
  onValueChange={(value: GameMode) => {
    setGameMode(value);
    resetGame();
  }}
>
  <SelectTrigger 
    className="w-32" 
    theme={{
      bg: currentTheme.cell,
      text: currentTheme.text,
      border: currentTheme.border
    }}
  >
    <SelectValue placeholder="Game Mode" />
  </SelectTrigger>
  <SelectContent
    theme={{
      bg: currentTheme.cell,
      text: currentTheme.text,
      border: currentTheme.border
    }}
  >
    <SelectItem value="local">Local 2P</SelectItem>
    <SelectItem value="bot-easy">Bot (Easy)</SelectItem>
    <SelectItem value="bot-medium">Bot (Medium)</SelectItem>
    <SelectItem value="bot-hard">Bot (Hard)</SelectItem>
  </SelectContent>
</Select>

<Select 
  value={theme}
  onValueChange={(value: ThemeKey) => setTheme(value)}
>
  <SelectTrigger 
    className="w-32"
    theme={{
      bg: currentTheme.cell,
      text: currentTheme.text,
      border: currentTheme.border
    }}
  >
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent
    theme={{
      bg: currentTheme.cell,
      text: currentTheme.text,
      border: currentTheme.border
    }}
  >
    <SelectItem value="classic">Classic</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="nature">Nature</SelectItem>
    <SelectItem value="sunset">Sunset</SelectItem>
    <SelectItem value="ocean">Ocean</SelectItem>
  </SelectContent>
</Select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <Badge variant="secondary">X: {scores.X}</Badge>
            <Badge variant="secondary">O: {scores.O}</Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={resetScores}
              className={`${currentTheme.border}`}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={resetGame}
              className={`${currentTheme.border}`}
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={`grid grid-cols-3 gap-2 ${currentTheme.board} p-2 rounded-lg`}>
          {board.map((square, i) => (
            <button
              key={i}
              className={`h-24 ${currentTheme.cell} ${currentTheme.border} border rounded-lg flex items-center justify-center text-4xl font-bold transition-colors duration-200`}
              onClick={() => handleClick(i)}
              disabled={square !== null || gameOver}
              type="button"
            >
              <span className={square === 'X' ? currentTheme.x : currentTheme.o}>
                {square}
              </span>
            </button>
          ))}
        </div>

        {gameOver && (
          <div className="mt-4 text-center font-bold">
            {winner === 'draw' ? (
              <p>It&apos;s a draw!</p>
            ) : (
              <p className={winner === 'X' ? currentTheme.x : currentTheme.o}>
                {winner} wins!
              </p>
            )}
          </div>
        )}

        {!gameOver && (
          <div className="mt-4 text-center">
            <p>Next player: <span className={isXNext ? currentTheme.x : currentTheme.o}>{isXNext ? 'X' : 'O'}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;