const accountId = props.accountId ?? context.accountId;

const createPuzzle = () => {
  Near.call([
    "crossword.puzzle.near",
    "new_puzzle",
    {
      answer_pk,
      dimensions,
      answers,
    },
  ]);
};

return (
  <div>
    <button onClick={createPuzzle}>Create Puzzle</button>
  </div>
);
