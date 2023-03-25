const Player = (board) => {
  const attack = (x, y) => {
    board.receiveAttack(x, y);
  };
  return { attack };
};

export default Player;
