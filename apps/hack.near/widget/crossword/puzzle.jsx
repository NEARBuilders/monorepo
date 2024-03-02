const puzzles = Near.view("crossword.puzzle.near", "get_unsolved_puzzles");

return { puzzles };
